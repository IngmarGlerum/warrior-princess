import { useEffect, useRef, useState } from 'react';
import sprites from '../assets/spritesheet.png';
import  './character.css'

const Character = () => {
  const [animation, setAnimation
    ] = useState('spellcast spellcastLeft');
    console.log(animation);

  //useEffect
  //handlekeydown function
  //is een switch case
  //cases wasd
  //set animation
  //eventlistener for keydown
  //return cleanupfunction remove eventlistener

  const animationName = 'walk' 
  const animationName2 = 'spellcast' 
  const characterSpeed = 2;
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const movementRef = useRef<Position>({ top: 0, left: 0 });

  interface Position {
    top: number;
    left: number;
  }
  
  // const useAnimation = (animationName: string) => {

    useEffect(() => {
      // const handleKeyDown = (event: { key: any; }) => {
      //   switch (event.key) {
      //     case 'a':
      //       setAnimation(`${animationName} ${animationName}Left`)
      //       break;
      //     case 'w':
      //       setAnimation(`${animationName} ${animationName}Back`)
      //       break;
      //     case 's':
      //       setAnimation(`${animationName} ${animationName}Front`)
      //       break;
      //     case 'd':
      //       setAnimation(`${animationName} ${animationName}Right`)
      //       break;
      //     default:
      //       break;
      //   }
      // }

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
          top: prev.top + (movementRef.current.top || 0),
          left: prev.left + (movementRef.current.left || 0),
        }));
      }
      
      const intervalId = setInterval(moveCharacter, 1000/60); //60 fps

      return () => {
        clearInterval(intervalId);
      };
    }, []);
  // }


    
  return (
    <>
        <div className="title">Character</div>
        <button onClick={() => setAnimation('spellcast spellcastLeft')}>Left</button>
        <button onClick={() => setAnimation('spellcast spellcastRight')}>Right</button>
        <button onClick={() => setAnimation('spellcast spellcastBack')}>Back</button>
        <button onClick={() => setAnimation('spellcast spellcastFront')}>Front</button>
        <div 
          className={`container ${animation}`} 
          style={{ top: position.top, left: position.left, position: 'absolute' }}></div>
        <img src={sprites} className='spritesheet' alt="" />
    </>
  )
}

export default Character