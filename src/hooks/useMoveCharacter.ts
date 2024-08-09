import { useEffect, useRef } from "react";
import { movementProps } from "../character/types";

export const useMoveCharachter = ({
  setAnimation,
  animationName,
  movementRef,
  characterSpeed,
  setPosition,
  setDirection,
}: movementProps) => {
  useEffect(() => {
    const handleKeyDown = (event: { key: string }) => {
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

    const handleKeyUp = (event: { key: string }) => {
      const key = event.key.toLowerCase();
      if (
        key === "a" ||
        key === "d" ||
        key === "arrowLeft" ||
        key === "arrowRight"
      ) {
        movementRef.current.left = 0;
      } else if (
        key === "w" ||
        key === "s" ||
        key === "arrowUp" ||
        key === "arrowDown"
      ) {
        movementRef.current.top = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // console.log('above useEffect');a

  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const moveCharacter = () => {
      setPosition((prev) => ({
        top: prev.top + (movementRef.current?.top || 0),
        left: prev.left + (movementRef.current?.left || 0),
      }));

      console.log("inside useEffect");

      // Request the next frame
      requestRef.current = requestAnimationFrame(moveCharacter);
    };

    // Start the animation loop
    requestRef.current = requestAnimationFrame(moveCharacter);

    return () => {
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);
};

// export const useRanged = (animationName, direction) => {
//   console.log('use move character');
//   useEffect(() => {
//     const handleClick = () => {
//       if (direction === 0) {
//         console.log(`${animationName} ${animationName}Left`);
//       } else if (direction === 1) {
//         console.log(`${animationName} ${animationName}Right`);
//       } else if (direction === 2) {
//         console.log(`${animationName} ${animationName}Back`);
//       } else if (direction === 3) {
//         console.log(`${animationName} ${animationName}Front`);
//       }
//     };

//     window.addEventListener('click', handleClick);
//     return () => {
//       window.removeEventListener('click', handleClick);
//     };
//   }, [animationName, direction]); // Include dependencies to ensure effect re-runs on changes
// };

export const useRanged = (setAnimation, animationName, direction) => {
  console.log("use move charecter");
  useEffect(() => {
    const handleClick = () => {
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
  }, []);
};
