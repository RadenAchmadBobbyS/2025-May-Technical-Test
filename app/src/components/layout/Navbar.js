"use client"
import { useLike } from "@/hooks/useLike";
import { usePathname } from "next/navigation";
import LikeButton from "./LikeButton";

export default function Navbar() {
  const { liked, like, unlike, toggle } = useLike();
  const pathname = usePathname();
  const isDetail = pathname && pathname.startsWith("/detail/");
  const logoUrl = isDetail
    ? "https://wisata.app/img/logo/wisata_diary.png"
    : "https://wisata.app/img/logo.png";

  return (
    <div className="bg-white shadow-inner py-4 px-6">
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="neumorphism">
          <img
            src={logoUrl}
            alt="logo"
            width={150}
            className="h-auto"
          />
        </div>

        <LikeButton liked={liked} like={like} unlike={unlike} toggle={toggle} />
      </div>
    </div>
  );
}
