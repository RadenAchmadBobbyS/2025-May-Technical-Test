import { FaThumbsUp } from "react-icons/fa";

export default function LikeButton({ liked, toggle }) {
  return (
    <button
      onClick={toggle}
      aria-label="Like this page"
      className={`p-3 rounded-full bg-white transition-all duration-200 
        ${
          liked
            ? "shadow-inner"
            : "shadow-[4px_4px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]"
        }`}
    >
      <FaThumbsUp
        className={`text-2xl transition duration-150 ${
          liked ? "text-gray-700 scale-110" : "text-gray-600"
        }`}
      />
    </button>
  );
}
