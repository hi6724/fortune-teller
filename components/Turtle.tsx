import { useGLTF, Center, useAnimations, Environment } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';

function Turtle() {
  const ref = useRef<any>();
  const avatar = useGLTF('/turtle.glb');
  const { actions } = useAnimations(avatar?.animations, ref);
  useEffect(() => {
    actions['Swim Cycle']?.play();
  }, []);
  return (
    <>
      <ambientLight />
      <Environment background files={'/bg.hdr'} />
      <Center>
        <group ref={ref} scale={1.5} rotation={[0, 0, 0]}>
          <primitive object={avatar.scene} />
        </group>
      </Center>
    </>
  );
}

export default Turtle;
