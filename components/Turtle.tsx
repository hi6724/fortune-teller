import { useGLTF, Center } from '@react-three/drei';
import { useAnimations } from '@react-three/drei';
import { Environment } from '@react-three/drei/core';
import React, { useEffect, useRef } from 'react';
import { degToRad } from 'three/src/math/MathUtils';

function Turtle() {
  const ref = useRef<any>();
  const avatar = useGLTF('/turtle.glb');
  const { actions } = useAnimations(avatar.animations, ref);
  useEffect(() => {
    actions['Swim Cycle']?.play();
  }, []);
  return (
    <>
      <ambientLight />
      <Center>
        <group ref={ref} scale={1.5} rotation={[0, degToRad(0), 0]}>
          <primitive object={avatar.scene} />
        </group>
      </Center>
    </>
  );
}

export default Turtle;
