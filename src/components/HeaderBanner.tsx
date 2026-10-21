import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, ChevronRight } from 'lucide-react';

interface HeaderBannerProps {
  onCtaClick: () => void;
}

export const HeaderBanner: React.FC<HeaderBannerProps> = ({ onCtaClick }) => {
  // Live ticking countdown timer starting from 1 hour 59 minutes 43 seconds like the reference image
  const [secondsLeft, setSecondsLeft] = useState<number>(7183);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 7183));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
  };

  return (
    <header className="relative w-full overflow-hidden bg-[#240003] text-white shadow-xl select-none">
      {/* Decorative top garland & ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/25 via-red-950/40 to-transparent pointer-events-none" />

      {/* Main Festive Durga Puja Visual - Direct from reference image */}
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="relative aspect-[709/307] w-full bg-[#180002] overflow-hidden group">
          <img
            src="/assets/aistudio/festive_durga_hero.png"
            alt="Durga Puja 100GB Free Internet Offer"
            className="w-full h-full object-cover object-center filter drop-shadow-md"
            loading="eager"
          />

          {/* Floating clickable overlay over the banner CTA button */}
          <button
            onClick={onCtaClick}
            aria-label="Activate Promo Now"
            className="absolute bottom-[8%] left-[48%] -translate-x-1/2 w-[34%] h-[15%] cursor-pointer opacity-0 hover:opacity-20 bg-white transition-opacity rounded-full focus:outline-none focus:ring-2 focus:ring-amber-400"
            title="এখনই একটিভ করুন"
          />

          {/* Live countdown timer overlay synchronized with reference position */}
          <div className="absolute bottom-[5%] right-[5%] bg-black/85 border border-red-500/80 px-2 py-0.5 rounded text-[10px] sm:text-xs font-mono font-bold text-amber-300 flex items-center gap-1 shadow-lg backdrop-blur-xs">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-[9px] text-gray-300 hidden xs:inline">শেষ হতে:</span>
            <span>{formatTime(secondsLeft)}</span>
          </div>
        </div>
      </div>

      {/* Subtle bottom festive status badge */}
      <div className="bg-gradient-to-r from-red-950 via-amber-900 to-red-950 border-t border-amber-600/40 py-1.5 px-3 flex items-center justify-between text-xs text-amber-200">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="font-medium tracking-wide">শারদীয়া দুর্গোৎসব অফার ২০২৬</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-amber-300/90">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>মেয়াদ ৩০ দিন পর্যন্ত</span>
        </div>
      </div>
    </header>
  );
};
