import React, { useState, useEffect } from 'react';
import cursor from '../Assets/mouse2.png'


const frameCount = 150;
const frameUrls = Array.from({ length: frameCount }, (_, index) => `guest table/${index + 1}.png`);

const ParallaxImageAnimation = () => {
    const [frameIndex, setFrameIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        setCursorPosition({ x: mouseX, y: mouseY });
      };

      useEffect(() => {
        window.addEventListener('wheel', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
          window.removeEventListener('wheel', handleScroll);
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }, [frameIndex]);
    
  
    const handleScroll = (e) => {
      const scrollDelta = e.deltaY;
      const framesToScroll = 1; 
      const newIndex = (frameIndex + Math.sign(scrollDelta) * framesToScroll) % frameCount;
      setFrameIndex(newIndex < 0 ? frameCount - 1 : newIndex);
    };
  
  
    return (
      <div className="parallax-container" style={{backgroundImage: 'bg'}}>
        <img src={frameUrls[frameIndex]} alt={`Frame ${frameIndex}`} className="parallax-image" />

        <div className="custom-cursor animate" style={{ left: cursorPosition.x, top: cursorPosition.y }}>
        <img src={cursor} style={{width: '70px', height: '70px'}} alt="Custom Cursor" />
      </div>
      </div>
    );
  };

export default ParallaxImageAnimation;
