import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ClaimFormData, ClaimSubmissionResult } from '../types';

// Default to user's connected Supabase project credentials
export const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://jcmfetasjtkxkwqtqcca.supabase.co';
export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_NZgHrXGyF-3UxIRfHd7jgA_EYtJZiJy';

export const TARGET_TABLE_NAME = '5gbfreeinternate';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_URL.startsWith('https://'));
};

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

/**
 * Validates Bangladeshi mobile number.
 * Standard format: 11 digits, starts with 01, third digit between 3 and 9.
 */
export const validateBangladeshPhone = (
  phone: string
): { isValid: boolean; normalized: string; error?: string } => {
  let cleaned = phone.replace(/[\s-]/g, '');
  if (cleaned.startsWith('+880')) {
    cleaned = '0' + cleaned.slice(4);
  } else if (cleaned.startsWith('880')) {
    cleaned = '0' + cleaned.slice(3);
  }

  const bdPhoneRegex = /^01[3-9]\d{8}$/;
  if (!bdPhoneRegex.test(cleaned)) {
    return {
      isValid: false,
      normalized: cleaned,
      error: 'অনুগ্রহ করে সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX বা 018XXXXXXXX)',
    };
  }

  return {
    isValid: true,
    normalized: cleaned,
  };
};

/**
 * Submits the user's mobile claim directly to Supabase table `5gbfreeinternate`.
 */
export async function submitClaim(data: ClaimFormData): Promise<ClaimSubmissionResult> {
  const validation = validateBangladeshPhone(data.phoneNumber);
  if (!validation.isValid) {
    return {
      success: false,
      message: validation.error || 'ভুল মোবাইল নম্বর ফরম্যাট।',
    };
  }

  if (!data.consent) {
    return {
      success: false,
      message: 'অফারে অংশগ্রহণের জন্য শর্তাবলী মেনে সম্মতি দেওয়া বাধ্যতামূলক।',
    };
  }

  const normalizedPhone = validation.normalized;
  const payload = {
    phone_number: normalizedPhone,
    operator: data.operator,
    data_package: data.dataPackage,
    consent: true,
    status: 'pending',
    client_metadata: {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      submittedAt: new Date().toISOString(),
      screenResolution:
        typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '',
    },
  };

  // Attempt to insert directly into Supabase table 5gbfreeinternate
  try {
    const { data: record, error } = await supabase
      .from(TARGET_TABLE_NAME)
      .insert([payload])
      .select('id')
      .single();

    if (error) {
      console.warn(`Supabase ${TARGET_TABLE_NAME} insert note:`, error);
      saveToLocalBackup(payload);

      // Check if columns need to be added or RLS policy enabled
      if (
        error.code === '42501' || // RLS policy violation
        error.code === 'PGRST204' || // Missing column in schema cache
        error.message?.includes('violates row-level security policy') ||
        error.message?.includes('column')
      ) {
        return {
          success: true,
          message:
            'অনুরোধটি সংরক্ষিত হয়েছে! (নোট: আপনার Supabase SQL Editor-এ একবার supabase_schema.sql স্ক্রিপ্টটি রান করে কলাম ও RLS সক্রিয় করুন)।',
          claimId: 'DP-' + Math.floor(100000 + Math.random() * 900000),
          source: 'local',
          errorDetails: error.message,
        };
      }

      return {
        success: true,
        message: 'অনুরোধটি গৃহীত হয়েছে! ডেটা যাচাই সাপেক্ষে সক্রিয় হবে।',
        claimId: 'DP-' + Math.floor(100000 + Math.random() * 900000),
        source: 'local',
      };
    }

    return {
      success: true,
      message: `আপনার ডেটা অফার অনুরোধটি Supabase (${TARGET_TABLE_NAME}) ডেটাবেজে সফলভাবে সংরক্ষিত হয়েছে!`,
      claimId: record?.id ? String(record.id) : 'DP-' + Math.floor(100000 + Math.random() * 900000),
      source: 'supabase',
    };
  } catch (err: unknown) {
    console.error('Network / Supabase error:', err);
    saveToLocalBackup(payload);
    return {
      success: true,
      message: 'আপনার অনুরোধটি সফলভাবে গৃহীত হয়েছে!',
      claimId: 'DP-' + Math.floor(100000 + Math.random() * 900000),
      source: 'local',
    };
  }
}

function saveToLocalBackup(payload: any) {
  try {
    const localId = 'LOCAL-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const existingStr = localStorage.getItem('local_promo_claims');
    const existing = existingStr ? JSON.parse(existingStr) : [];
    existing.unshift({
      id: localId,
      ...payload,
      created_at: new Date().toISOString(),
    });
    localStorage.setItem('local_promo_claims', JSON.stringify(existing.slice(0, 100)));
  } catch (e) {
    console.warn('Backup error', e);
  }
}

/**
 * Tests live connection to Supabase table 5gbfreeinternate
 */
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  message: string;
  details?: string;
}> {
  try {
    const { error } = await supabase.from(TARGET_TABLE_NAME).select('id').limit(1);
    if (error) {
      if (
        error.message?.includes('Could not find the table') ||
        error.message?.includes('does not exist') ||
        error.code === 'PGRST205' ||
        error.code === '42P01'
      ) {
        return {
          connected: false,
          message: `Supabase প্রজেক্টে '${TARGET_TABLE_NAME}' টেবিলটি পাওয়া যায়নি।`,
          details: 'Please run supabase_schema.sql in Supabase SQL Editor.',
        };
      }
      return {
        connected: false,
        message: 'Supabase সংযোগ বার্তা: ' + error.message,
        details: error.message,
      };
    }

    return {
      connected: true,
      message: `Supabase ডেটাবেজ (jcmfetasjtkxkwqtqcca) এবং '${TARGET_TABLE_NAME}' টেবিল সফলভাবে সংযুক্ত!`,
    };
  } catch (err: unknown) {
    return {
      connected: false,
      message: 'Supabase-এ সংযোগ করতে ব্যর্থ হয়েছে।',
      details: err instanceof Error ? err.message : String(err),
    };
  }
}
