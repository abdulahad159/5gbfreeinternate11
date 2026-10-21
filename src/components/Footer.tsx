import React from 'react';
import { Settings, Shield, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenSetup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSetup }) => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 text-xs py-8 border-t border-gray-800">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-4">
        {/* Festive Greeting */}
        <div className="inline-flex items-center gap-1.5 bg-amber-950/60 text-amber-300 border border-amber-800/50 px-3 py-1 rounded-full text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>শারদীয়া দুর্গোৎসব ২০২৬ উপলক্ষে সবার জন্য শুভকামনা</span>
        </div>

        {/* Disclaimer & Policy Notice */}
        <p className="text-[11px] leading-relaxed text-gray-400 max-w-lg mx-auto">
          এই ওয়েবসাইটটি শারদীয়া দুর্গোৎসব উপলক্ষে বিশেষ প্রচারণামূলক অফার প্রদর্শনের জন্য প্রস্তুতকৃত। ডেটা প্যাক অ্যাক্টিভেশন সংশ্লিষ্ট অপারেটরের নেটওয়ার্ক নিয়মাবলী অনুযায়ী সম্পন্ন হয়। কোনো অবস্থাতেই গোপন পিন অথবা ব্যাংক তথ্য চাওয়া হয় না।
        </p>

        {/* Helpline information */}
        <div className="pt-2 border-t border-gray-800/80 text-[11px] text-gray-500">
          <span>গ্রাহক সেবা হেল্পলাইন: গ্রামীণফোন (১২১), রবি (১২১), বাংলালিংক (১২১), এয়ারটেল (১২১), টেলিটক (১২১)</span>
        </div>

        {/* Bottom row: Setup Guide & Copyright */}
        <div className="pt-3 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-gray-500">
            <span>© ২০২৬ দূর্গা পূজা উৎসব অফার। সর্বস্বত্ব সংরক্ষিত।</span>
          </span>

          {/* Quick Setup & DB Management Modal Trigger */}
          <button
            onClick={onOpenSetup}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors cursor-pointer border border-gray-700"
            title="Supabase, Netlify ও বিজ্ঞাপন সেটিংস"
          >
            <Settings className="w-3 h-3 text-amber-400" />
            <span>সেটআপ ও ডেটাবেজ গাইড</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
