import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import singleImg from '../Assets/147.png'
const ParallaxSection = () => {
  return (
    <div>
      {/* Parallax component */}
      <Parallax y={[0, -50]} tagOuter="figure">
        <img src={singleImg} alt="Parallax pic" />
      </Parallax>
    </div>
  );
};

export default ParallaxSection;