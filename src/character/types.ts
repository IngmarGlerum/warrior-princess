export interface Position {
    top: number;
    left: number;
}

export interface movementProps {
    setAnimation: React.Dispatch<React.SetStateAction<string>>; 
    animationName: string;
    movementRef: React.MutableRefObject<Position>;
    characterSpeed: number;
    setPosition: React.Dispatch<React.SetStateAction<{
      top: number;
      left: number;
    }>>;
    setDirection: React.Dispatch<React.SetStateAction<string>>;
}