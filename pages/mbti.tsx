import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';
import { MBTI_LIST } from '../utils';

function Mbti() {
  const router = useRouter();
  const [progressData, setProgress] = useRecoilState(progressAtom);
  useEffect(() => {
    // if (progressData.gender === '') router.replace('/');
    setProgress({ ...progressData, progress: 2 });
  }, []);

  console.log(progressData);
  const handleClick = (mbti: string) => () => {
    setProgress({ ...progressData, mbti });
    router.push('/birthday');
  };
  return (
    <div>
      {MBTI_LIST.map((mbti) => (
        <Button
          onClick={handleClick(mbti)}
          value={mbti}
          type={progressData.mbti === mbti ? 'primary' : 'default'}
          key={mbti}
        >
          {mbti}
        </Button>
      ))}
    </div>
  );
}

export default Mbti;
