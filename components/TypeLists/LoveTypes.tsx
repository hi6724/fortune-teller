import { Button } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../../atoms/progress';
import { LOVE_STATUS } from '../../utils';
import { useMobile } from '../../hooks/useMobile';

function LoveTypes() {
  const [progressData, setProgress] = useRecoilState(progressAtom);
  const isMobile = useMobile();
  return (
    <>
      {LOVE_STATUS.map((loveStatus, i) => {
        const selected = progressData.typeStatus === loveStatus;
        return (
          <Button
            size={!isMobile ? 'large' : 'middle'}
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
