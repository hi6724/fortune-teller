import type { NextPage } from 'next';
import { useRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const router = useRouter();
  const [progressData, setProgress] = useRecoilState(progressAtom);
  
  useEffect(() => {
    setProgress({ ...progressData, progress: 0 });
  }, []);

  return (
    <div>
      {/* <Canvas style={{ height: '40vh' }}>
        <Turtle />
      </Canvas> */}
      <Button onClick={() => router.push('/gender')}>시작하기</Button>
    </div>
  );
};

export default Home;
