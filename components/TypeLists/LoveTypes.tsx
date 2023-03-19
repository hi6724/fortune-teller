import { Button } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../../atoms/progress';
import { LOVE_STATUS } from '../../utils';

function LoveTypes() {
  const [progressData, setProgress] = useRecoilState(progressAtom);
  return (
    <div>
      {LOVE_STATUS.map((loveStatus, i) => (
        <Button
          type={progressData.typeStatus === loveStatus ? 'primary' : 'default'}
          onClick={() =>
            setProgress({ ...progressData, typeStatus: loveStatus })
          }
          key={i}
        >
          {loveStatus}
        </Button>
      ))}
    </div>
  );
}

export default LoveTypes;
