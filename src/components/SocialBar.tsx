import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Heart, Check } from 'lucide-react';

interface SocialBarProps {
  onCommentClick: () => void;
  commentsCount: number;
}

export const SocialBar: React.FC<SocialBarProps> = ({ onCommentClick, commentsCount }) => {
  const [likesCount, setLikesCount] = useState<number>(157482);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleToggleLike = () => {
    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'দূর্গা পূজা ২০২৬ উপলক্ষে ফ্রি ইন্টারনেট অফার',
      text: 'শারদীয়া শুভেচ্ছা! দূর্গা পূজা উপলক্ষে সকল সিমে ফ্রি ইন্টারনেট ডেটা অফার চলছে। এখনই নিন:',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Clipboard write failed', e);
    }
  };

  const formatReactions = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
  };

  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-2">
        {/* Top summary row: 👍 ❤️ 157k | Comments 341 • Share */}
        <div className="flex items-center justify-between text-xs text-gray-500 pb-2">
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={handleToggleLike}>
            <div className="flex -space-x-1">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white text-[10px]">
                👍
              </span>
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px]">
                ❤️
              </span>
            </div>
            <span className="font-semibold text-blue-600 hover:underline">
              {formatReactions(likesCount)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <button
              onClick={onCommentClick}
              className="hover:underline cursor-pointer"
            >
              Comments {commentsCount}
            </button>
            <span>•</span>
            <button onClick={handleShare} className="hover:underline cursor-pointer">
              Share
            </button>
          </div>
        </div>

        {/* Action Buttons row: 👍 Like | 💬 Comment | 🔗 Share */}
        <div className="border-t border-gray-200 pt-1.5 grid grid-cols-3 gap-1 text-center">
          <button
            onClick={handleToggleLike}
            className={`flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              isLiked
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-blue-600 text-blue-600' : ''}`} />
            <span>Like</span>
          </button>

          <button
            onClick={onCommentClick}
            className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Comment</span>
          </button>

          <button
            onClick={handleShare}
            className="relative flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
