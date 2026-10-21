import { AdSlotConfig } from '../types';

/**
 * Advertising Configuration with User's Smart Links
 * -------------------------------------------------------------
 * 1. https://auctionr.org/4/9f4a14541b375300eddbe3d5932d4bf9
 * 2. https://auctionr.org/4/5fc7b8e88585875a6ef5b5e32c67bba3
 * 3. https://auctionr.org/4/6e4b98859a0bbd23fdc83dc5da53b25b
 * 4. https://auctionr.org/4/067b14c6ee5ed25679be68c0b56722d5
 */
export const initialAdSlots: Record<string, AdSlotConfig> = {
  header_banner: {
    id: 'header_banner',
    title: 'স্পেশাল উৎসব বোনাস ও মেগা রিওয়ার্ড!',
    subtitle: 'সীমিত সময়ের এক্সক্লুসিভ অফার পেতে এখানে ক্লিক করুন',
    ctaText: 'এখনই ভিজিট করুন →',
    dimensions: '728x90 (Desktop) / 320x50 (Mobile)',
    enabled: true,
    smartLinkUrl: 'https://auctionr.org/4/9f4a14541b375300eddbe3d5932d4bf9',
  },
  content_banner: {
    id: 'content_banner',
    title: 'শারদীয়া স্পনসরড উপহার ডিল',
    subtitle: 'অনলাইন রিওয়ার্ড ও ক্যাশব্যাক ভাউচার সংগ্রহ করুন',
    ctaText: 'অফারটি দেখুন →',
    dimensions: '300x250 (Medium Rectangle)',
    enabled: true,
    smartLinkUrl: 'https://auctionr.org/4/5fc7b8e88585875a6ef5b5e32c67bba3',
  },
  comments_banner: {
    id: 'comments_banner',
    title: 'আজকের সেরা স্পন্সরড অফার ও ডিসকাউন্ট',
    subtitle: 'সকল মোবাইল ব্যবহারকারীর জন্য বিশেষ ক্যাম্পেইন',
    ctaText: 'ক্লেম করুন →',
    dimensions: '300x100 / 320x50',
    enabled: true,
    smartLinkUrl: 'https://auctionr.org/4/6e4b98859a0bbd23fdc83dc5da53b25b',
  },
  bottom_banner: {
    id: 'bottom_banner',
    title: 'উৎসব ডিল ও বোনাস প্যাকেজ',
    subtitle: 'ক্লিক করে সরাসরি পার্টনার অফার এক্সপ্লোর করুন',
    ctaText: 'চেক করুন →',
    dimensions: '300x100 / Responsive',
    enabled: true,
    smartLinkUrl: 'https://auctionr.org/4/067b14c6ee5ed25679be68c0b56722d5',
  },
};

export const getStoredAdConfig = (): Record<string, AdSlotConfig> => {
  try {
    const saved = localStorage.getItem('durga_promo_ad_config_v2');
    if (saved) {
      return { ...initialAdSlots, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not read saved ad config', e);
  }
  return initialAdSlots;
};

export const saveAdConfig = (config: Record<string, AdSlotConfig>) => {
  try {
    localStorage.setItem('durga_promo_ad_config_v2', JSON.stringify(config));
  } catch (e) {
    console.warn('Could not save ad config', e);
  }
};
