/* eslint-disable  */

import type { NextPage } from 'next';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { colors, simpleShadow } from '../utils';
import { MotionCanvas, motion, LayoutCamera } from 'framer-motion-3d';
import { OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils';

const Home: NextPage = () => {
  const router = useRouter();
  const [progressData, setProgress] = useRecoilState(progressAtom);

  useEffect(() => {
    setProgress({ ...progressData, progress: 0 });
  }, []);

  return (
    <div>
      <MotionCanvas style={{ height: '100vh' }}>
        <ambientLight />
        <LayoutCamera animate={{ y: 8, z: 10 }} />
        <OrbitControls maxDistance={20} minDistance={5} />
        <Sea />
      </MotionCanvas>
      <Canvas style={{ display: 'none' }}>
        <mesh></mesh>
      </Canvas>
      <Button
        style={{
          position: 'fixed',
          bottom: '15vh',
          left: '50%',
          transform: 'translate(-50%,50%)',
          width: '90vw',
          height: '15vw',
          color: '#fff',
          fontWeight: '600',
          fontSize: '1.5rem',
          backgroundColor: colors.lightGreen,
          border: 'none',
          borderRadius: '100rem',
        }}
        onClick={() => router.push('/gender')}
      >
        <h1 style={{ textShadow: simpleShadow }}>시작하기</h1>
      </Button>
    </div>
  );
};

export default Home;

const Sea = () => {
  const ref = useRef<any>();

  const { scene, animations } = useGLTF(
    'https://res.cloudinary.com/dohkkln9r/image/upload/v1680445479/sea.glb'
  );
  const { actions } = useAnimations(animations, ref);
  useEffect(() => {
    actions['Animation']?.play();
  }, []);

  return (
    <motion.group rotation={[0, degToRad(-135), 0]} ref={ref}>
      <primitive object={scene} />
    </motion.group>
  );
};
