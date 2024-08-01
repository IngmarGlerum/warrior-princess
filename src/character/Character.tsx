import { useEffect, useState } from 'react';
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
  
  // const useAnimation = (animationName: string) => {

    useEffect(() => {
      const handleKeyDown = (event: { key: any; }) => {
        switch (event.key) {
          case 'a':
            setAnimation(`${animationName} ${animationName}Left`)
            break;
          case 'w':
            setAnimation(`${animationName} ${animationName}Back`)
            break;
          case 's':
            setAnimation(`${animationName} ${animationName}Front`)
            break;
          case 'd':
            setAnimation(`${animationName} ${animationName}Right`)
            break;
          default:
            break;
        }
      }
  
      window.addEventListener('keydown', handleKeyDown)
      
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
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
        <div className={`container ${animation}`}></div>
        <img src={sprites} className='spritesheet' alt="" />
    </>
  )
}

export default Character