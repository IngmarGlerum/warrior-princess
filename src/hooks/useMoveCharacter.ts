import { useEffect } from "react";
import { movementProps } from "../character/types";

export const useMoveCharachter = ({setAnimation, animationName, movementRef, characterSpeed, setPosition, setDirection} : movementProps ) => {
    useEffect(() => {
        const handleKeyDown = (event: { key: string; }) => {
          const key = event.key.toLowerCase();
          if (key === 'a' || key === 'arrowleft') {
            setAnimation(`${animationName} ${animationName}Left`);
            setDirection(0);
            movementRef.current.left = -characterSpeed;
        } else if (key === 'd' || key === 'arrowright') {
            setAnimation(`${animationName} ${animationName}Right`);
            setDirection(1);
            movementRef.current.left = characterSpeed;
        } else if (key === 'w' || key === 'arrowup') {
            setAnimation(`${animationName} ${animationName}Back`);
            setDirection(2);
            movementRef.current.top = -characterSpeed;
        } else if (key === 's' || key === 'arrowdown') {
            setAnimation(`${animationName} ${animationName}Front`);
            setDirection(3);
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

// determine when shoot animation ends
// make css class for showing only first frame (not an animation)

export const useRanged = (setAnimation, animationName, direction) => {
    useEffect(() => {
        const handleClick = () => {
            if(direction === 0) {
                setAnimation(`${animationName} ${animationName}Left`)
            } else if (direction === 1){
                setAnimation(`${animationName} ${animationName}Right`)
            } else if (direction === 2){
                setAnimation(`${animationName} ${animationName}Back`)
            } else if (direction === 3){
                setAnimation(`${animationName} ${animationName}Front`)
            }
        }
        window.addEventListener('click', handleClick)
        return () => {
            window.removeEventListener('click', handleClick)
        };
    }, [direction]);
}
