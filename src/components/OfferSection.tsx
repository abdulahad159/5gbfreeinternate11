import React from 'react';
import { DataPackage } from '../types';
import { OperatorLogo } from './OperatorLogo';
import { operatorList } from '../data/operatorsData';
import { Zap, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';

interface OfferSectionProps {
  selectedPackage: DataPackage;
  onSelectPackage: (pkg: DataPackage) => void;
  onCtaClick: () => void;
}

export const OfferSection: React.FC<OfferSectionProps> = ({
  selectedPackage,
  onSelectPackage,
  onCtaClick,
}) => {
  // Single highlighted middle offer card
  const middlePackage = {
    id: selectedPackage || '100 GB',
    title: '১০০ জিবি (100 GB)',
    validity: '৩০ দিন মেয়াদ • সম্পূর্ণ বিনামূল্যে',
    badge: '★ বিশেষ শারদীয়া মেগা অফার ★',
  };

  return (
    <section className="w-full bg-white border-b border-gray-200">
      {/* 1. Green Festive Ribbon Banner - Matching Screenshot */}
      <div className="w-full bg-[#097a55] text-white py-2.5 px-3 text-center shadow-inner">
        <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white drop-shadow-xs">
          দূর্গা পূজা ২০২৬ উপলক্ষে — ফ্রি ১০০GB ইন্টারনেট
        </h2>
      </div>

      <div className="max-w-2xl mx-auto px-4 pt-6 pb-7 text-center">
        {/* 2. Headline - Matching Screenshot */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#d62828] leading-tight tracking-tight mb-2">
          সমস্ত নেটওয়ার্কের জন্য বিনামূল্যে ১০০GB ডেটা প্ল্যান।
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 mb-5">
          শারদীয়া শুভেচ্ছা ও উপহার। যেকোনো প্রিপেইড অথবা পোস্টপেইড সিমে সহজে অ্যাক্টিভ করুন।
        </p>

        {/* Single Highlighted Middle Offer Card */}
        <div className="max-w-xs sm:max-w-sm mx-auto mb-6">
          <button
            type="button"
            onClick={onCtaClick}
            className="w-full relative rounded-2xl p-4 text-center transition-all cursor-pointer border-2 border-[#0ebd6d] bg-gradient-to-b from-emerald-50 via-white to-emerald-50/70 shadow-lg shadow-emerald-500/15 ring-4 ring-[#0ebd6d]/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] group"
          >
            {/* Top Highlight Badge */}
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-500 text-white text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-200 animate-spin" />
              <span>{middlePackage.badge}</span>
            </span>

            <div className="pt-2">
              <div className="font-black text-gray-900 text-2xl sm:text-3xl tracking-tight text-emerald-800 flex items-center justify-center gap-2">
                <span>{middlePackage.title}</span>
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white shadow-xs">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-gray-600 mt-1">
                {middlePackage.validity}
              </div>
              <div className="mt-2 text-[11px] text-emerald-700 bg-emerald-100/70 rounded-lg py-1 px-2 font-medium">
                সবচেয়ে জনপ্রিয় শারদীয়া উৎসব প্যাক (সকল সিমে কার্যকর)
              </div>
            </div>
          </button>
        </div>

        {/* 3. Primary CTA Button - Matching Screenshot */}
        <div className="relative max-w-md mx-auto mb-6">
          <button
            onClick={onCtaClick}
            type="button"
            className="w-full relative group cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-r from-[#0ebd6d] via-[#10ca76] to-[#0fae65] text-white font-bold text-xl sm:text-2xl py-3.5 px-8 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 active:scale-[0.99] transition-all duration-200 border border-emerald-500/80 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            {/* Glossy light effect */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-xs">
              <span>এখনই নিন</span>
            </span>
          </button>
        </div>

        {/* Supported SIM Providers Row */}
        <div className="pt-2 border-t border-dashed border-gray-200">
          <p className="text-[11px] sm:text-xs text-gray-500 font-medium mb-3">
            উপলব্ধ ৫টি বাংলাদেশী অপারেটরে কার্যকর:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {operatorList.map((op) => (
              <div
                key={op.id}
                className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-700 transition-colors shadow-2xs"
                title={`${op.nameEnglish} (${op.prefixes.join(', ')})`}
              >
                <OperatorLogo operator={op.id} size={20} />
                <span className="text-[11px] sm:text-xs">{op.nameEnglish}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security / Consent assurance badge */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            কোনো পাসওয়ার্ড বা ওটিপি লাগবে না
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            ১০০% নিরাপদ ভেরিফিকেশন
          </span>
        </div>
      </div>
    </section>
  );
};
