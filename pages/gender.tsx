import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';

function Gender() {
  const router = useRouter();
  const [progressData, setProgress] = useRecoilState(progressAtom);
  useEffect(() => {
    setProgress({ ...progressData, progress: 1 });
  }, []);

  const handleClick = (gender: string) => () => {
    setProgress({ ...progressData, gender });
    router.push('/mbti');
  };
  return (
    <div>
      <Button
        type={progressData.gender === '남자' ? 'primary' : 'default'}
        onClick={handleClick('남자')}
      >
        남자
      </Button>
      <Button
        type={progressData.gender === '여자' ? 'primary' : 'default'}
        onClick={handleClick('여자')}
      >
        여자
      </Button>
      <Button
        type={progressData.gender === '선택안함' ? 'primary' : 'default'}
        onClick={handleClick('선택안함')}
      >
        선택안함
      </Button>
    </div>
  );
}

export default Gender;
