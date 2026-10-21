import { SimOperator } from '../types';

export interface OperatorInfo {
  id: SimOperator;
  nameBangla: string;
  nameEnglish: string;
  prefixes: string[];
  themeColor: string;
  accentBg: string;
  borderColor: string;
  tagline: string;
}

export const OPERATORS: Record<SimOperator, OperatorInfo> = {
  Grameenphone: {
    id: 'Grameenphone',
    nameBangla: 'গ্রামীণফোন (GP)',
    nameEnglish: 'Grameenphone',
    prefixes: ['017', '013'],
    themeColor: '#00a4d3',
    accentBg: '#e6f7fc',
    borderColor: '#33bae5',
    tagline: 'চলো বহুদূর',
  },
  Robi: {
    id: 'Robi',
    nameBangla: 'রবি (Robi)',
    nameEnglish: 'Robi Axiata',
    prefixes: ['018'],
    themeColor: '#e50914',
    accentBg: '#fff0f1',
    borderColor: '#f04b54',
    tagline: 'জ্বলে উঠুন আপন শক্তিতে',
  },
  Banglalink: {
    id: 'Banglalink',
    nameBangla: 'বাংলালিংক (BL)',
    nameEnglish: 'Banglalink',
    prefixes: ['019', '014'],
    themeColor: '#f26522',
    accentBg: '#fff3ec',
    borderColor: '#f68b57',
    tagline: 'নতুন কিছু করো',
  },
  Airtel: {
    id: 'Airtel',
    nameBangla: 'এয়ারটেল (Airtel)',
    nameEnglish: 'Airtel',
    prefixes: ['016'],
    themeColor: '#e31b23',
    accentBg: '#fdf0f0',
    borderColor: '#ea4c53',
    tagline: 'ফ্রেন্ডসদের সাথে অলটাইম',
  },
  Teletalk: {
    id: 'Teletalk',
    nameBangla: 'টেলিটক (Teletalk)',
    nameEnglish: 'Teletalk Bangladesh',
    prefixes: ['015'],
    themeColor: '#007a3d',
    accentBg: '#eefbf4',
    borderColor: '#249e62',
    tagline: 'আমাদের ফোন',
  },
};

export const operatorList: OperatorInfo[] = [
  OPERATORS.Grameenphone,
  OPERATORS.Robi,
  OPERATORS.Banglalink,
  OPERATORS.Airtel,
  OPERATORS.Teletalk,
];

/**
 * Detects the operator based on the first 3 digits of a Bangladeshi phone number
 */
export function detectOperatorFromPhone(phone: string): SimOperator | null {
  let cleaned = phone.replace(/[\s-]/g, '');
  if (cleaned.startsWith('+880')) {
    cleaned = '0' + cleaned.slice(4);
  } else if (cleaned.startsWith('880')) {
    cleaned = '0' + cleaned.slice(3);
  }

  if (cleaned.length >= 3) {
    const prefix = cleaned.slice(0, 3);
    for (const op of operatorList) {
      if (op.prefixes.includes(prefix)) {
        return op.id;
      }
    }
  }
  return null;
}
