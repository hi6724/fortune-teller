import { Button, Progress } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import progressAtom from '../atoms/progress';

function Navbar() {
  const { progress } = useRecoilValue(progressAtom);
  const router = useRouter();
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => router.back()}>이전</Button>
        <div>꼬북이네</div>
        <div>{progress}/6</div>
      </div>
      <Progress
        percent={(progress * 100) / 6}
        size='small'
        showInfo={false}
        strokeColor={{ from: '#108ee9', to: '#87d068' }}
      />
    </>
  );
}

export default Navbar;
