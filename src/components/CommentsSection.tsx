import React, { useState } from 'react';
import { CommentItem } from '../types';
import { initialComments } from '../data/commentsData';
import { ThumbsUp, Send, MessageCircle } from 'lucide-react';

interface CommentsSectionProps {
  commentsInputRef: React.RefObject<HTMLInputElement | null>;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ commentsInputRef }) => {
  const [comments, setComments] = useState<CommentItem[]>(initialComments);
  const [visibleCount, setVisibleCount] = useState<number>(15);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);

  const handleToggleCommentLike = (id: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const hasLiked = !c.hasLiked;
          return {
            ...c,
            hasLiked,
            likes: hasLiked ? c.likes + 1 : c.likes - 1,
          };
        }
        return c;
      })
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const author = newAuthor.trim() || 'শুভাকাঙ্ক্ষী';
    const newEntry: CommentItem = {
      id: 'c-user-' + Date.now(),
      authorName: author,
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
      text: newCommentText.trim(),
      timeAgo: 'Just now',
      likes: 1,
      hasLiked: true,
      repliesCount: 0,
    };

    setComments((prev) => [newEntry, ...prev]);
    setNewCommentText('');
    setReplyToId(null);
  };

  const handleReplyClick = (authorName: string, id: string) => {
    setReplyToId(id);
    setNewCommentText(`@${authorName} `);
    commentsInputRef.current?.focus();
  };

  return (
    <section className="w-full bg-[#ffffff] pt-4 pb-12">
      <div className="max-w-2xl mx-auto px-3 sm:px-4">
        {/* Subtle demonstration note as requested by prompt constraints */}
        <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <MessageCircle className="w-4 h-4 text-gray-400" />
            <span>জনপ্রিয় সামাজিক প্রতিক্রিয়া ({comments.length}টি মন্তব্য)</span>
          </div>
          <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            ডেমো ও ইউজার রিভিউ
          </span>
        </div>

        {/* New Comment Input Box */}
        <form onSubmit={handleAddComment} className="mb-6 bg-gray-50 p-3 rounded-2xl border border-gray-200">
          <div className="flex items-start gap-2.5">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces"
              alt="You"
              className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-200"
            />
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="আপনার নাম (ঐচ্ছিক)"
                className="w-full text-xs px-3 py-1.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
              />
              <div className="relative">
                <input
                  ref={commentsInputRef}
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="একটি মন্তব্য লিখুন..."
                  className="w-full text-xs sm:text-sm pl-3 pr-10 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                />
                <button
                  type="submit"
                  aria-label="Send comment"
                  disabled={!newCommentText.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 text-emerald-600 hover:text-emerald-700 disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Comments Feed List - Exactly styled like the reference screenshot */}
        <div className="space-y-4">
          {comments.slice(0, visibleCount).map((comment) => (
            <div key={comment.id} className="flex items-start gap-2.5 sm:gap-3 group">
              {/* User Avatar */}
              <img
                src={comment.authorAvatar}
                alt={comment.authorName}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover shrink-0 border border-gray-200 shadow-2xs"
                loading="lazy"
                onError={(e) => {
                  // Fallback avatar if Unsplash image fails
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces';
                }}
              />

              <div className="flex-1 max-w-[88%] sm:max-w-[92%]">
                {/* Speech Bubble Card - Matching reference #f0f2f5 */}
                <div className="relative inline-block bg-[#f0f2f5] rounded-2xl px-3.5 py-2.5 text-left max-w-full break-words">
                  <div className="font-bold text-xs sm:text-sm text-[#050505] leading-snug">
                    {comment.authorName}
                  </div>
                  <p className="text-xs sm:text-[13px] text-gray-900 mt-0.5 leading-relaxed font-normal">
                    {comment.text}
                  </p>

                  {/* Reaction badge floating on bubble bottom right */}
                  {comment.likes > 0 && (
                    <div className="absolute -bottom-2 right-2 bg-white px-1.5 py-0.5 rounded-full shadow-xs border border-gray-200 flex items-center gap-0.5 text-[10px] text-gray-600">
                      <span className="text-[10px]">👍</span>
                      <span className="font-semibold">{comment.likes}</span>
                    </div>
                  )}
                </div>

                {/* Comment Actions: Like · Reply · Time */}
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500 mt-1 pl-2">
                  <button
                    onClick={() => handleToggleCommentLike(comment.id)}
                    className={`font-semibold hover:underline cursor-pointer ${
                      comment.hasLiked ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Like
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => handleReplyClick(comment.authorName, comment.id)}
                    className="font-semibold text-gray-600 hover:text-gray-900 hover:underline cursor-pointer"
                  >
                    Reply
                  </button>
                  <span>·</span>
                  <span className="text-gray-400">{comment.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < comments.length && (
          <div className="text-center pt-6">
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 15, comments.length))}
              className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border border-gray-300"
            >
              আরও মন্তব্য দেখুন ({comments.length - visibleCount}টি বাকি)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
