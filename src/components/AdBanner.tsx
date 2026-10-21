import React from 'react';
import { AdSlotConfig } from '../types';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdBannerProps {
  slot: AdSlotConfig;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slot, className = '' }) => {
  if (!slot || !slot.enabled) return null;

  return (
    <div className={`w-full flex flex-col items-center justify-center my-3.5 ${className}`}>
      {/* Required label for ad disclosure */}
      <div className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold text-gray-400 mb-1">
        <span>বিজ্ঞাপন / SPONSORED</span>
      </div>

      {slot.adCode ? (
        /* If custom iframe / script code is provided */
        <div
          className="w-full flex items-center justify-center overflow-hidden rounded-xl border border-gray-200"
          dangerouslySetInnerHTML={{ __html: slot.adCode }}
        />
      ) : slot.smartLinkUrl ? (
        /* High-Converting Smart Link Banner */
        <a
          href={slot.smartLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-xl mx-auto block group cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 p-0.5 shadow-md hover:shadow-lg">
            <div className="bg-white rounded-[14px] p-3 sm:p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5 text-amber-100 animate-pulse" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-gray-900 truncate group-hover:text-amber-700 transition-colors">
                    {slot.title}
                  </div>
                  {slot.subtitle && (
                    <div className="text-[11px] text-gray-500 truncate">
                      {slot.subtitle}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-white text-xs font-bold shadow-xs group-hover:from-amber-600 group-hover:to-red-700 transition-all">
                <span>{slot.ctaText || 'ভিজিট করুন'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </a>
      ) : (
        /* Reserved Ad Space Container - Compliant placeholder */
        <div className="w-full max-w-xl mx-auto border-2 border-dashed border-gray-200 bg-gray-50/70 rounded-xl p-3 text-center text-gray-400">
          <div className="text-xs font-semibold text-gray-600 mb-0.5">
            {slot.title}
          </div>
          <div className="text-[11px] text-gray-400 font-mono">
            স্থান সংরক্ষিত ({slot.dimensions})
          </div>
        </div>
      )}
    </div>
  );
};
