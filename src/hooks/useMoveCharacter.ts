import { useEffect, useRef } from "react";
import { MovementProps } from "../character/types";

export const useMoveCharachter = ({
  isMoveKeyPressedRef,
  setAnimation,
  animationName,
  movementRef,
  characterSpeed,
  setPosition,
  setDirection,
}: MovementProps) => {
  const animationFrameIdRef = useRef<number>(0); // To store the requestAnimationFrame ID

  // Set up event listeners for key presses
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      isMoveKeyPressedRef.current = true;
      const key = event.key.toLowerCase();
      if (key === "a" || key === "arrowleft") {
        setAnimation(`${animationName} ${animationName}Left`);
        setDirection(0);
        movementRef.current.left = -characterSpeed;
      } else if (key === "d" || key === "arrowright") {
        setAnimation(`${animationName} ${animationName}Right`);
        setDirection(1);
        movementRef.current.left = characterSpeed;
      } else if (key === "w" || key === "arrowup") {
        setAnimation(`${animationName} ${animationName}Back`);
        setDirection(2);
        movementRef.current.top = -characterSpeed;
      } else if (key === "s" || key === "arrowdown") {
        setAnimation(`${animationName} ${animationName}Front`);
        setDirection(3);
        movementRef.current.top = characterSpeed;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      isMoveKeyPressedRef.current = false;
      const key = event.key.toLowerCase();
      if (
        key === "a" ||
        key === "d" ||
        key === "arrowleft" ||
        key === "arrowright"
      ) {
        movementRef.current.left = 0;
      } else if (
        key === "w" ||
        key === "s" ||
        key === "arrowup" ||
        key === "arrowdown"
      ) {
        movementRef.current.top = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [animationName, characterSpeed, setAnimation, setDirection]);

  // Animation loop
  useEffect(() => {
    const updatePosition = () => {
      if (isMoveKeyPressedRef.current) {
        setPosition((prev) => ({
          top: prev.top + (movementRef.current.top || 0),
          left: prev.left + (movementRef.current.left || 0),
        }));
      }
      animationFrameIdRef.current = requestAnimationFrame(updatePosition); // Schedule the next update
    };

    updatePosition(); // Start the animation loop

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);
};

export const useRanged = (setAnimation, animationName, direction) => {
  const handleClick = () => {
    console.log(direction);
    if (direction === 0) {
      setAnimation(`${animationName} ${animationName}Left`);
    } else if (direction === 1) {
      setAnimation(`${animationName} ${animationName}Right`);
    } else if (direction === 2) {
      setAnimation(`${animationName} ${animationName}Back`);
    } else if (direction === 3) {
      setAnimation(`${animationName} ${animationName}Front`);
    }
  };
  window.addEventListener("click", handleClick);
  return () => {
    window.removeEventListener("click", handleClick);
  };
};
