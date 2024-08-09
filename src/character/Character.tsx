import { useRef, useState } from "react";
import sprites from "../assets/spritesheetBow.png";
import "./character.css";
import { useMoveCharachter, useRanged } from "../hooks/useMoveCharacter";
import { Position } from "./types";
import { useAnimationEnd } from "../hooks/useAnimationEnd";

const Character = () => {
  const [animation, setAnimation] = useState("spellcast spellcastLeft");

  const animationName = "walk";
  // const animationName2 = 'spellcast'
  const characterSpeed = 4;
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [direction, setDirection] = useState(0);
  const movementRef = useRef<Position>({ top: 0, left: 0 });
  const weapon = "recurveBow";

  const movement = {
    setAnimation,
    animationName,
    movementRef,
    characterSpeed,
    setPosition,
    setDirection,
  };

  useMoveCharachter(movement);
  // console.log(direction);
  // console.log('rerender');

  useRanged(setAnimation, "shoot", direction);
  const { characterDivRef, isAnimationEnded } = useAnimationEnd();
  // console.log(isAnimationEnded);
  // console.log('character.tsx rerender');

  const idleArray = [
    "bowIdleLeft",
    "bowIdleRight",
    "bowIdleBack",
    "bowIdleFront",
  ];

  return (
    <>
      <div className="title">Character</div>
      <button onClick={() => setAnimation("spellcast spellcastLeft")}>
        Left
      </button>
      <button onClick={() => setAnimation("spellcast spellcastRight")}>
        Right
      </button>
      <button onClick={() => setAnimation("spellcast spellcastBack")}>
        Back
      </button>
      <button onClick={() => setAnimation("spellcast spellcastFront")}>
        Front
      </button>
      <div
        ref={characterDivRef}
        className={`container ${weapon} ${
          isAnimationEnded ? idleArray[direction] : animation
        }`}
        style={{ top: position.top, left: position.left, position: "absolute" }}
      ></div>
      <img src={sprites} className="spritesheet" alt="" />
    </>
  );
};

export default Character;
