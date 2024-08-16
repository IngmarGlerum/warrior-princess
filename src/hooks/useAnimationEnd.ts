import { useEffect, useRef, useState } from "react";

export const useAnimationEnd = (
  isAnimationDone: React.MutableRefObject<boolean>
) => {
  const characterDivRef = useRef<HTMLDivElement>(null);
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);

  useEffect(() => {
    const handleAnimationEnd = () => {
      console.log("animation ended");
      isAnimationDone.current = true;
    };

    const element = characterDivRef.current;
    if (element) {
      element.addEventListener("animationend", handleAnimationEnd);
    }
    return () => {
      if (element) {
        element.removeEventListener("animationend", handleAnimationEnd);
      }
    };
  }, []);

  return { characterDivRef, isAnimationEnded, setIsAnimationEnded };
};
