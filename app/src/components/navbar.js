"use client"
import { useLike } from "@/hooks/useLike";
import LikeButton from "./likeButton";

export default function Navbar() {
  const { liked, like, unlike, toggle } = useLike();

  return (
    <div className="bg-white shadow-inner py-4 px-6">
      <div className="flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="neumorphism">
          <img
            src="https://wisata.app/img/logo.png"
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
