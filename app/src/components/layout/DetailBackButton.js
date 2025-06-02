"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function DetailBackButton({ variant }) {
  const router = useRouter();
  if (variant === "hero") {
    return (
      <button
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 hover:bg-white/95 shadow-lg border border-gray-200 text-gray-700 font-semibold text-base transition backdrop-blur-md"
        onClick={() => router.back()}
        type="button"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
        <span>Kembali</span>
      </button>
    );
  }
  return (
    <button
      className="mb-4 flex items-center gap-2 px-4 py-2  bg-white shadow hover:bg-gray-100 rounded-2xl border-gray-200 text-gray-700 transition"
      onClick={() => router.back()}
      type="button"
    >
      <FaArrowLeft />
      Back
    </button>
  );
}
