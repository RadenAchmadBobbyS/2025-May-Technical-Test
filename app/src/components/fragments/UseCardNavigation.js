import { useState } from "react";

export function useCardNavigation(feedLength) {
  const [index, setIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);

  const handlePrev = () => {
    setSlideDirection('left');
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? feedLength - 1 : prev - 1));
      setSlideDirection(null);
    }, 300);
  };
  const handleNext = () => {
    setSlideDirection('right');
    setTimeout(() => {
      setIndex((prev) => (prev === feedLength - 1 ? 0 : prev + 1));
      setSlideDirection(null);
    }, 300);
  };
  return { index, setIndex, slideDirection, handlePrev, handleNext };
}
