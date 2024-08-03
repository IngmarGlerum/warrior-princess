import { useEffect } from "react";

export const useMoveCharachter = (setAnimation, animationName, movementRef, characterSpeed, setPosition) => {
    useEffect(() => {
        const handleKeyDown = (event: { key: string; }) => {
          const key = event.key.toLowerCase();
          if (key === 'a' || key === 'arrowleft') {
            setAnimation(`${animationName} ${animationName}Left`)
            movementRef.current.left = -characterSpeed;
          } else if (key === 'd' || key === 'arrowright') {
            setAnimation(`${animationName} ${animationName}Right`)
            movementRef.current.left = characterSpeed;
          } else if (key === 'w' || key === 'arrowup') {
            setAnimation(`${animationName} ${animationName}Back`)
            movementRef.current.top = -characterSpeed;
          } else if (key === 's' || key === 'arrowdown') {
            setAnimation(`${animationName} ${animationName}Front`)
            movementRef.current.top = characterSpeed;
          }
        };
    
        const handleKeyUp = (event: { key: string }) => {
          const key = event.key.toLowerCase();
          if(key === 'a' || key === 'd' || key === 'arrowLeft' || key === 'arrowRight'){
            movementRef.current.left = 0;
          } else if(key === 'w' || key === 's' || key === 'arrowUp' || key === 'arrowDown'){
            movementRef.current.top = 0;
          }
        };
    
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
          window.removeEventListener('keydown', handleKeyDown)
          window.removeEventListener('keyup', handleKeyUp);
        };
        }, []);

    useEffect(() => {
        const moveCharacter = () => {
          setPosition((prev) => ({
            top: prev.top + (movementRef.current?.top || 0),
            left: prev.left + (movementRef.current?.left || 0),
          }));
        }
        
        const intervalId = setInterval(moveCharacter, 1000/60); //60 fps
    
        return () => {
          clearInterval(intervalId);
        };
    }, []);

}
