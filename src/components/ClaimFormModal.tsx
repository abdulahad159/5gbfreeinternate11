import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SimOperator, DataPackage, ClaimSubmissionResult } from '../types';
import { operatorList, detectOperatorFromPhone, OPERATORS } from '../data/operatorsData';
import { OperatorLogo } from './OperatorLogo';
import { submitClaim, validateBangladeshPhone } from '../config/supabaseClient';
import {
  X,
  Phone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Share2,
  Lock,
} from 'lucide-react';

interface ClaimFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackage: DataPackage;
}

export const ClaimFormModal: React.FC<ClaimFormModalProps> = ({
  isOpen,
  onClose,
  initialPackage,
}) => {
  const [phone, setPhone] = useState('');
  const [selectedOperator, setSelectedOperator] = useState<SimOperator>('Grameenphone');
  const [selectedPackage, setSelectedPackage] = useState<DataPackage>(initialPackage);
  const [consent, setConsent] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<ClaimSubmissionResult | null>(null);

  // Sync package if initialPackage changes
  useEffect(() => {
    setSelectedPackage(initialPackage);
  }, [initialPackage]);

  // Handle phone change & auto-detect operator
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow digits, spaces, plus sign
    const sanitized = val.replace(/[^\d+]/g, '');
    setPhone(sanitized);
    setErrorMsg(null);

    const detected = detectOperatorFromPhone(sanitized);
    if (detected) {
      setSelectedOperator(detected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validate phone
    const validation = validateBangladeshPhone(phone);
    if (!validation.isValid) {
      setErrorMsg(validation.error || 'সঠিক বাংলাদেশী মোবাইল নম্বর দিন।');
      return;
    }

    if (!consent) {
      setErrorMsg('অফারে অংশ নিতে শর্তাবলীতে সম্মতি প্রদান আবশ্যক।');
      return;
    }

    setIsLoading(true);

    try {
      const result = await submitClaim({
        phoneNumber: validation.normalized,
        operator: selectedOperator,
        dataPackage: selectedPackage,
        consent: true,
      });

      if (result.success) {
        setSubmissionResult(result);
        // Festive Confetti trigger
        try {
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0ebd6d', '#f26522', '#e50914', '#00a4d3', '#ffd700'],
          });
        } catch (e) {
          console.warn('Confetti error', e);
        }
      } else {
        setErrorMsg(result.message);
      }
    } catch (err: unknown) {
      setErrorMsg('সার্ভারে যোগাযোগ করতে ব্যর্থ হয়েছে। পরে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSubmissionResult(null);
    setPhone('');
    setErrorMsg(null);
  };

  const maskPhone = (num: string) => {
    if (num.length >= 8) {
      return num.slice(0, 3) + '****' + num.slice(-4);
    }
    return num;
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 my-auto">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-[#990000] via-[#c1121f] to-[#990000] text-white p-4 text-center">
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3 right-3 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-200 px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>দূর্গা পূজা উৎসব অফার ২০২৬</span>
          </div>
          <h3 className="text-xl font-bold text-white drop-shadow-xs">
            ফ্রি ডেটা অ্যাক্টিভেশন ফরম
          </h3>
          <p className="text-xs text-amber-100/90 mt-0.5">
            আপনার সিম নির্বাচন করে মোবাইল নম্বর প্রবেশ করান
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 max-h-[80vh] overflow-y-auto">
          {!submissionResult ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Data Package Summary Badge - Single Highlighted Package */}
              <div className="bg-gradient-to-r from-emerald-50 via-amber-50/50 to-emerald-50 border-2 border-emerald-500/80 rounded-xl p-3 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider block flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>বিশেষ শারদীয়া অফার</span>
                  </span>
                  <span className="text-base font-black text-emerald-900">
                    ১০০ জিবি (100 GB) ফ্রি ডেটা
                  </span>
                  <span className="text-[11px] text-emerald-700 block font-medium">
                    মেয়াদ ৩০ দিন • সকল সিমে ১০০% বিনামূল্যে
                  </span>
                </div>
                <div className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100 GB</span>
                </div>
              </div>

              {/* 1. SIM Operator Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  ১. আপনার সিম অপারেটর নির্বাচন করুন:
                </label>
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                  {operatorList.map((op) => {
                    const isSelected = selectedOperator === op.id;
                    return (
                      <button
                        key={op.id}
                        type="button"
                        onClick={() => setSelectedOperator(op.id)}
                        className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-2 shadow-sm scale-102 ring-2 ring-emerald-500/20'
                            : 'border-gray-200 bg-gray-50/80 hover:bg-gray-100'
                        }`}
                        style={{
                          borderColor: isSelected ? op.themeColor : undefined,
                          backgroundColor: isSelected ? op.accentBg : undefined,
                        }}
                      >
                        <OperatorLogo operator={op.id} size={28} />
                        <span className="text-[10px] font-bold text-gray-800 mt-1 truncate w-full">
                          {op.nameEnglish}
                        </span>
                        <span className="text-[8px] text-gray-500 font-mono">
                          {op.prefixes[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Bangladesh Mobile Number Input */}
              <div>
                <label
                  htmlFor="phone-input"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
                >
                  ২. বাংলাদেশী মোবাইল নম্বর (১১ ডিজিট):
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="ml-1 text-xs font-bold text-gray-500 border-r border-gray-300 pr-2">
                      +88
                    </span>
                  </div>
                  <input
                    id="phone-input"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={14}
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="017XXXXXXXX"
                    className="w-full pl-16 pr-28 py-3 text-base sm:text-lg font-mono font-bold tracking-wider rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
                  />
                  {/* Selected Operator Indicator Badge inside input */}
                  <div className="absolute inset-y-0 right-1.5 flex items-center pr-1.5">
                    <span
                      className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-md"
                      style={{
                        backgroundColor: OPERATORS[selectedOperator].accentBg,
                        color: OPERATORS[selectedOperator].themeColor,
                      }}
                    >
                      <OperatorLogo operator={selectedOperator} size={14} />
                      <span className="hidden xs:inline">{OPERATORS[selectedOperator].nameEnglish}</span>
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  উদাহরণ: 017XXXXXXXX (GP), 018XXXXXXXX (Robi), 019XXXXXXXX (BL), 016XXXXXXXX (Airtel), 015XXXXXXXX (Teletalk)
                </p>
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-700 text-xs animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 3. Consent & Privacy Declaration */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-[11px] leading-relaxed text-gray-600">
                    <strong className="text-gray-800">গোপনীয়তা ও ব্যবহারের সম্মতি:</strong>{' '}
                    আমি অফারের শর্তাবলী মেনে নিচ্ছি এবং ডেটা অ্যাক্টিভেশনের উদ্দেশ্যে আমার মোবাইল নম্বর ও নির্বাচিত অপারেটরের তথ্য যাচাইয়ের সুস্পষ্ট সম্মতি দিচ্ছি। কোনো তৃতীয় পক্ষের বাণিজ্যিক প্রচারণায় এই নম্বর ব্যবহার করা হবে না।
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-r from-[#0ebd6d] to-[#0fae65] text-white font-bold text-lg py-3 px-6 shadow-md hover:shadow-lg active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>যাচাই ও সক্রিয় করা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>অনুরোধ জমা দিন (Submit)</span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3" />
                <span>SSL এনক্রিপ্টেড ও সুরক্ষিত সংযোগ</span>
              </div>
            </form>
          ) : (
            /* Success Confirmation View */
            <div className="py-2 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900">
                  অভিনন্দন! আপনার অনুরোধ গৃহীত হয়েছে
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  শারদীয়া শুভেচ্ছা! আপনার মোবাইল নম্বরে বিশেষ ডেটা প্যাক সক্রিয়করণের প্রক্রিয়া শুরু হয়েছে।
                </p>
              </div>

              {/* Ticket / Claim Card */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-left space-y-2.5">
                <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <span className="text-xs text-gray-500 font-medium">রেফারেন্স আইডি:</span>
                  <span className="font-mono text-xs font-bold text-gray-800 bg-white px-2 py-0.5 rounded border border-gray-200">
                    {submissionResult.claimId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">মোবাইল নম্বর:</span>
                  <span className="font-mono text-sm font-bold text-gray-900">
                    {maskPhone(phone)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">অপারেটর:</span>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-gray-800">
                    <OperatorLogo operator={selectedOperator} size={16} />
                    <span>{OPERATORS[selectedOperator].nameBangla}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">ডেটা অফার:</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {selectedPackage} ফ্রি ইন্টারনেট
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-gray-200 text-[11px]">
                  <span className="text-gray-500">কার্যকর সময়কাল:</span>
                  <span className="font-semibold text-amber-700">২৪ থেকে ৭২ ঘণ্টার মধ্যে</span>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-left text-xs text-blue-900 space-y-1">
                <p className="font-semibold flex items-center gap-1 text-blue-800">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                  পরবর্তী ধাপ:
                </p>
                <p className="text-[11px] leading-relaxed text-blue-700">
                  আপনার নির্বাচিত সিমের নেটওয়ার্ক সিস্টেমে তথ্যটি প্রেরণ করা হয়েছে। অপারেটর থেকে এসএমএসের মাধ্যমে চূড়ান্ত অ্যাক্টিভেশন বার্তা পাবেন।
                </p>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-gray-300 text-gray-700 font-semibold text-xs hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  আরেকটি সিমে আবেদন করুন
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  সম্পন্ন
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
