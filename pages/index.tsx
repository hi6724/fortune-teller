/* eslint-disable  */

import type { NextPage } from 'next';
import { Suspense, useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { colors, simpleShadow } from '../utils';
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  useProgress,
  Html,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { degToRad } from 'three/src/math/MathUtils';
import prevDataAtom from '../atoms/prevData';
import resultAtom from '../atoms/result';
import dayjs from 'dayjs';
import { useMobile } from '../hooks/useMobile';
import LottieTurtle from '../components/LottieTurtle';

const Home: NextPage = () => {
  const router = useRouter();
  const isMobile = useMobile();
  const [progressData, setProgress] = useRecoilState(progressAtom);
  const [prevData, setPrevData] = useRecoilState(prevDataAtom);
  const setResult = useSetRecoilState(resultAtom);

  useEffect(() => {
    const fromLocal = localStorage.getItem('ggobukine');
    if (fromLocal) setPrevData(JSON.parse(fromLocal));
    setProgress({ ...progressData, progress: 0 });
  }, []);
  const handleStart = () => {
    if (!prevData.result) {
      router.push('/gender');
      return;
    }
    if (dayjs().unix() - dayjs(prevData.date).unix() < 300) {
      setResult(prevData.result);
      setProgress({ ...prevData.params, birthday: dayjs(prevData.date) });
      router.push('/result');
      return;
    }
    setPrevData({
      result: null,
      date: dayjs(),
      params: {
        progress: 0,
        gender: '',
        mbti: '',
        birthday: dayjs(),
        type: '',
        typeStatus: '',
        engTypeStatus: '',
      },
    });
    router.push('/gender');
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <LottieTurtle />

      <Button
        style={{
          position: 'fixed',
          bottom: isMobile ? '15vh' : '80px',
          right: isMobile ? '5vw' : '30px',
          width: '90vw',
          maxWidth: '540px',
          height: '10vh',
          maxHeight: '82px',

          color: '#fff',
          fontWeight: '600',
          fontSize: '1.5rem',
          backgroundColor: colors.lightGreen,
          border: 'none',
          borderRadius: '100rem',
        }}
        onClick={handleStart}
      >
        <h1 style={{ textShadow: simpleShadow }}>시작하기</h1>
      </Button>
    </div>
  );
};

export default Home;

const Sea = () => {
  const ref = useRef<any>();
  useThree(({ camera }) => camera.position.set(0, 4, 5));

  const { scene, animations } = useGLTF('/sealife/scene.gltf');
  const { actions } = useAnimations(animations, ref);
  useEffect(() => {
    actions['Animation']?.play();
  }, []);

  return (
    <group rotation={[0, degToRad(-135), 0]} ref={ref}>
      <primitive object={scene} />
    </group>
  );
};

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <Html center>로딩중 {progress} %</Html>;
}
