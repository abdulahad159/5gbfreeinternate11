export type SimOperator = 'Grameenphone' | 'Robi' | 'Banglalink' | 'Airtel' | 'Teletalk';

export type DataPackage = '5 GB' | '10 GB' | '100 GB';

export interface ClaimFormData {
  phoneNumber: string;
  operator: SimOperator;
  dataPackage: DataPackage;
  consent: boolean;
}

export interface ClaimSubmissionResult {
  success: boolean;
  message: string;
  claimId?: string;
  source?: 'supabase' | 'local';
  errorDetails?: string;
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  timeAgo: string;
  likes: number;
  hasLiked?: boolean;
  repliesCount?: number;
  badge?: string;
}

export interface AdSlotConfig {
  id: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  dimensions: string;
  enabled: boolean;
  smartLinkUrl?: string;
  adCode?: string;
}
