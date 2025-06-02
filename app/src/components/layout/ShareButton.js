"use client";
import { getShareLinks } from "@/components/fragments/ShareLinks";
import { FaShare } from "react-icons/fa";
import { useState } from "react";

export default function ShareButton({ shareUrl, shareTitle, position = "bottom" }) {
  const [showShare, setShowShare] = useState(false);
  const shareLinks = getShareLinks(shareUrl, shareTitle);
  // Tentukan posisi dropdown
  const dropdownClass = position === "top"
    ? "absolute right-0 bottom-10 w-56 bg-white rounded-xl shadow-lg z-20 flex flex-col border border-gray-200 animate-fadeInUp"
    : "absolute right-0 top-10 w-56 bg-white rounded-xl shadow-lg z-20 flex flex-col border border-gray-200 animate-fadeInUp";
  return (
    <div className="flex justify-end pt-3 relative mb-4">
      <button
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition"
        type="button"
        onClick={e => { e.stopPropagation(); setShowShare(v => !v); }}
      >
        <FaShare className="text-md" />
        Share
      </button>
      {showShare && (
        <div className={dropdownClass}>
          {shareLinks.map(link => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 hover:rounded-2xl text-gray-700"
              onClick={e => e.stopPropagation()}
            >
              {link.icon} {link.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
