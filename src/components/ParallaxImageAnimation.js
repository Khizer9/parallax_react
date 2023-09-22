import React, { useState, useEffect } from 'react';
import cursor from '../Assets/mouse2.png';

const frameCount = 149;
const frameUrls = Array.from({ length: frameCount }, (_, index) => `Resized/${index + 1}.png`);

const ParallaxImageAnimation = () => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    setCursorPosition({ x: mouseX, y: mouseY });
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Preload all images
    const preloadImages = async () => {
      const imagePromises = frameUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.src = url;
          image.onload = resolve;
          image.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error preloading images:', error);
      }
    };

    preloadImages();

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [frameIndex]);

  const handleScroll = (e) => {
    const scrollDelta = e.deltaY;
    const framesToScroll = 3;
    let newIndex = frameIndex + Math.sign(scrollDelta) * framesToScroll;

    newIndex = Math.min(frameCount - 1, Math.max(0, newIndex));

    setFrameIndex(newIndex);
  };

  return (
    <div className="parallax-container" style={{ backgroundImage: 'bg' }}>
       {imagesLoaded ? (
      <img src={frameUrls[frameIndex]} alt={`Frame ${frameIndex}`} className="parallax-image" />
    ) : (
      // Display the loading spinner while images are loaded
      <div className="loading-spinner"></div>
    )}

      <div className="custom-cursor animate" style={{ left: cursorPosition.x, top: cursorPosition.y }}>
        <img src={cursor} style={{ width: '70px', height: '70px' }} alt="Custom Cursor" />
      </div>
    </div>
  );
};

export default ParallaxImageAnimation;
