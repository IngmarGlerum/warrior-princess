export interface Position {
  top: number;
  left: number;
}

export interface MovementProps {
  setIsAnimationEnded: React.Dispatch<React.SetStateAction<boolean>>;
  isMoveKeyPressedRef: React.MutableRefObject<boolean>;
  setAnimation: React.Dispatch<React.SetStateAction<string>>;
  animationName: string;
  movementRef: React.MutableRefObject<Position>;
  characterSpeed: number;
  setPosition: React.Dispatch<
    React.SetStateAction<{
      top: number;
      left: number;
    }>
  >;
  setDirection: React.Dispatch<React.SetStateAction<number>>;
}
