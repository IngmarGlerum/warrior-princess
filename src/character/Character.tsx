import { useState } from 'react';
import sprites from '../assets/spritesheet.png';
import  './character.css'

const Character = () => {
  const [animation, setAnimation
    ] = useState('spellcastLeft');
    console.log(animation);
    
  return (
    <>
        <div className="title">Character</div>
        <button onClick={() => setAnimation('spellcastLeft')}>Left</button>
        <button onClick={() => setAnimation('spellcastRight')}>Right</button>
        <div className={`container ${animation}`}></div>
        <img src={sprites} className='spritesheet' alt="" />
    </>
  )
}

export default Character