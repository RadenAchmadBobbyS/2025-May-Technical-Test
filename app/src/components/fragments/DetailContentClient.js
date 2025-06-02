"use client";
import { renderDiaryContent } from "../../../utils/cms.client";

export default function DetailContentClient({ mdxSource }) {
  if (!mdxSource) {
    console.warn("[DetailContentClient] mdxSource is null or undefined");
    return <div style={{ color: "red" }}>Konten detail tidak tersedia.</div>;
  }
  try {
    return renderDiaryContent(mdxSource);
  } catch (e) {
    console.error("[DetailContentClient] Error rendering MDX:", e);
    return <div style={{ color: "red" }}>Gagal menampilkan konten detail.</div>;
  }
}
