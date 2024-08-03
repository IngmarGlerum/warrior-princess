import { useEffect, useRef, useState } from 'react';
import sprites from '../assets/spritesheet.png'
import  './character.css'
import { useMoveCharachter } from '../hooks/useMoveCharacter';

const Character = () => {
  const [animation, setAnimation] = useState('spellcast spellcastLeft');
  
  const animationName = 'walk' 
  const animationName2 = 'spellcast' 
  const characterSpeed = 4;
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const movementRef = useRef<Position>({ top: 0, left: 0 });

  interface Position {
    top: number;
    left: number;
  }

  useMoveCharachter(setAnimation, animationName, movementRef, characterSpeed, setPosition);
  
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