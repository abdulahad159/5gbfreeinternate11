import React, { useState, useRef } from 'react';
import { HeaderBanner } from './components/HeaderBanner';
import { OfferSection } from './components/OfferSection';
import { ClaimFormModal } from './components/ClaimFormModal';
import { SocialBar } from './components/SocialBar';
import { CommentsSection } from './components/CommentsSection';
import { SetupGuideModal } from './components/SetupGuideModal';
import { Footer } from './components/Footer';
import { DataPackage } from './types';
import { getStoredAdConfig } from './config/adsConfig';
import { Database } from 'lucide-react';
import { isSupabaseConfigured } from './config/supabaseClient';

export default function App() {
  const [selectedPackage, setSelectedPackage] = useState<DataPackage>('100 GB');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [adSlots, setAdSlots] = useState(getStoredAdConfig());

  const commentsInputRef = useRef<HTMLInputElement>(null);
  const isDbConfigured = isSupabaseConfigured();

  const handleOpenClaim = () => {
    setIsClaimModalOpen(true);
  };

  const handleScrollToComments = () => {
    commentsInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    commentsInputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-neutral-200/70 text-gray-900 flex flex-col justify-between font-['Hind_Siliguri',sans-serif]">
      {/* Mobile-first centered container */}
      <div className="w-full max-w-2xl mx-auto bg-white min-h-screen shadow-2xl flex flex-col overflow-x-hidden relative">
        
        {/* Floating Quick Database/Setup Status Badge for Owner/Tester */}
        <div className="sticky top-2 z-40 px-3 flex justify-end pointer-events-none">
          <button
            onClick={() => setIsSetupModalOpen(true)}
            className="pointer-events-auto shadow-md text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gray-900/90 text-white hover:bg-black transition-all flex items-center gap-1.5 backdrop-blur-xs cursor-pointer border border-gray-700/60"
            title="Supabase ও Netlify সেটিংস দেখুন"
          >
            <Database className="w-3 h-3 text-amber-400" />
            <span>DB: {isDbConfigured ? 'Supabase সংযুক্ত' : 'লোকাল মোড'}</span>
            <span
              className={`w-2 h-2 rounded-full ${
                isDbConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
          </button>
        </div>

        {/* 1. Festive Durga Puja Hero Banner (Cropped directly from reference) */}
        <HeaderBanner onCtaClick={handleOpenClaim} />

        {/* 2. Offer Section: Green ribbon, bold headline, highlighted package card & glowing CTA */}
        <OfferSection
          selectedPackage={selectedPackage}
          onSelectPackage={setSelectedPackage}
          onCtaClick={handleOpenClaim}
        />

        {/* 3. Social Reactions Bar (👍 ❤️ 157k | Comments 341 • Share | Like, Comment, Share) */}
        <SocialBar
          onCommentClick={handleScrollToComments}
          commentsCount={341}
        />

        {/* 4. Comments Section (35+ comments styled identical to reference screenshot) */}
        <CommentsSection commentsInputRef={commentsInputRef} />

        {/* 5. Footer */}
        <Footer onOpenSetup={() => setIsSetupModalOpen(true)} />

        {/* Claim Submission Modal */}
        <ClaimFormModal
          isOpen={isClaimModalOpen}
          onClose={() => setIsClaimModalOpen(false)}
          initialPackage={selectedPackage}
        />

        {/* Setup, Supabase DB & Netlify Guide Modal */}
        <SetupGuideModal
          isOpen={isSetupModalOpen}
          onClose={() => setIsSetupModalOpen(false)}
          adSlots={adSlots}
          onUpdateAdSlots={setAdSlots}
        />
      </div>
    </div>
  );
}
