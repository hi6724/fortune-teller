import React from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../assets/loading_turtle.json';
import { useMobile } from '../hooks/useMobile';

function LottieTurtle() {
  const isMobile = useMobile();

  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData,
      }}
      height={isMobile ? 'calc(100vw - 2rem)' : 400}
      width={isMobile ? 'calc(100vw - 2rem)' : 400}
    />
  );
}

export default LottieTurtle;
