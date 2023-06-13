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
      {LOVE_STATUS.map(({ korean, eng }, i) => {
        const selected = progressData.typeStatus === korean;
        return (
          <Button
            size={!isMobile ? 'large' : 'middle'}
            type={selected ? 'primary' : 'default'}
            onClick={() =>
              setProgress({
                ...progressData,
                typeStatus: korean,
                engTypeStatus: eng,
              })
            }
            key={i}
            style={{
              color: selected ? '#fff' : '#ff91a4',
              backgroundColor: selected ? '#ff91a4' : '#fff',
            }}
          >
            {korean}
          </Button>
        );
      })}
    </>
  );
}

export default LoveTypes;
