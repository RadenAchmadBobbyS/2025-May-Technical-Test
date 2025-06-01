import { useState, useEffect } from "react";

export function useLike(key = "liked") {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved === "true") setLiked(true);
  }, [key]);

  useEffect(() => {
    localStorage.setItem(key, liked.toString());
  }, [liked, key]);

  function like() {
    setLiked(true);
  }

  function unlike() {
    setLiked(false);
  }

  function toggle() {
    setLiked((prev) => !prev);
  }

  return { liked, like, unlike, toggle };
}
