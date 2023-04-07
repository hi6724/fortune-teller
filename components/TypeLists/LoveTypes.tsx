import { Button } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../../atoms/progress';
import { LOVE_STATUS } from '../../utils';

function LoveTypes() {
  const [progressData, setProgress] = useRecoilState(progressAtom);
  return (
    <>
      {LOVE_STATUS.map((loveStatus, i) => {
        const selected = progressData.typeStatus === loveStatus;
        return (
          <Button
            type={selected ? 'primary' : 'default'}
            onClick={() =>
              setProgress({ ...progressData, typeStatus: loveStatus })
            }
            key={i}
            style={{
              color: selected ? '#fff' : '#ff91a4',
              backgroundColor: selected ? '#ff91a4' : '#fff',
            }}
          >
            {loveStatus}
          </Button>
        );
      })}
    </>
  );
}

export default LoveTypes;
