"use client";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getDiaryFeed } from "../../../api/cms";
import { getSizeOptimizedImageUrl } from "../../../utils/cms";
import { useRouter } from "next/navigation";
import ShareButton from "../layout/ShareButton";
import { useCardNavigation } from "./UseCardNavigation";

export default function Card({ feed: feedProp, initialIndex = 0, onNavigate }) {
  const [feed, setFeed] = useState(feedProp || []);
  const [selectedEmbed, setSelectedEmbed] = useState(null);
  const router = useRouter();

  // navigation logic
  const { index, setIndex, slideDirection, handlePrev, handleNext } = useCardNavigation(feed.length);

  useEffect(() => {
    if (!feedProp) {
      async function fetchFeed() {
        try {
          const data = await getDiaryFeed();
          setFeed(data.content || []);
        } catch (e) {
          setFeed([]);
        }
      }
      fetchFeed();
    } else {
      setFeed(feedProp);
    }
  }, [feedProp]);

  useEffect(() => {
    if (typeof initialIndex === 'number') setIndex(initialIndex);
  }, [initialIndex, setIndex]);

  useEffect(() => {
    if (onNavigate) onNavigate(index);
  }, [index, onNavigate]);

  if (!feed.length) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <span className="block w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin" aria-label="Loading" />
      </div>
    );
  }

  const post = feed[index];
  const date = post?.created_dt ? new Date(post.created_dt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "";
  const imageUrl = post?.meta?.image || getSizeOptimizedImageUrl(post?.image, "lg");
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + `/detail/${post.id}` : '';
  const shareTitle = post?.meta?.title || '';

  return (
    <div className="relative flex items-center justify-center my-1">
      <button
        className="absolute left-50 z-10 p-4 rounded-full neumorphism-btn neumorphism-btn-lg hover:shadow-inner transition border border-gray-100"
        aria-label="Previous"
        onClick={handlePrev}
      >
        <FaChevronLeft className="text-2xl" />
      </button>

      <div
        className={[
          "max-w-3xl w-full neumorphism-card bg-white rounded-2xl p-8",
          "shadow-[8px_8px_24px_#d1d9e6,-8px_-8px_24px_#ffffff]",
          "transition-shadow duration-300 cursor-pointer",
          slideDirection === 'left' ? '-translate-x-16 opacity-0' : '',
          slideDirection === 'right' ? 'translate-x-16 opacity-0' : ''
        ].join(' ')}
        onClick={() => router.push(`/detail/${post.id}`)}
        tabIndex={0}
        role="button"
        aria-label={`Lihat detail ${post?.meta?.title}`}
        onMouseEnter={e => e.currentTarget.classList.add('hovered-shadow')}
        onMouseLeave={e => e.currentTarget.classList.remove('hovered-shadow')}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <img
              src="https://wisata.app/img/logo/pwa-icon.png"
              alt="User Avatar"
              className="w-12 h-12 rounded-full shadow-md"
            />
            <div>
              <p className="font-semibold text-gray-800">Wisata Diary</p>
              <p className="text-sm text-gray-500">{date}</p>
            </div>
          </div>
        </div>

        <div className="text-gray-700 text-base mb-4 text-nowrap">
          {post?.meta?.title}
        </div>
        <div className="relative rounded-xl overflow-hidden mb-4">
          <img
            src={imageUrl}
            alt="Post"
            className="w-full h-100 object-cover"
          />
          <span className="absolute top-3 right-3 bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            Article
          </span>
        </div>

        {/* Share Button & Dropdown */}
        <ShareButton shareUrl={shareUrl} shareTitle={shareTitle} position="top" />
        {selectedEmbed === 'instagram'}
        {selectedEmbed === 'tiktok'}
        {selectedEmbed === 'twitter'  }
      </div>

      <button
        className="absolute right-50 z-10 p-4 rounded-full neumorphism-btn neumorphism-btn-lg hover:shadow-inner transition border border-gray-100"
        aria-label="Next"
        onClick={handleNext}
      >
        <FaChevronRight className="text-2xl" />
      </button>
    </div>
  );
}