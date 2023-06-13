import { Button } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../../atoms/progress';
import { HEALTH_STATUS } from '../../utils';
import { useMobile } from '../../hooks/useMobile';

function HealthTypes() {
  const isMobile = useMobile();
  const [progressData, setProgress] = useRecoilState(progressAtom);
  // #5EC0D9
  return (
    <>
      {HEALTH_STATUS.map(({ korean, eng }, i) => {
        const selected = progressData.typeStatus === korean;

        return (
          <Button
            size={!isMobile ? 'large' : 'middle'}
            type={progressData.typeStatus === korean ? 'primary' : 'default'}
            onClick={() =>
              setProgress({
                ...progressData,
                typeStatus: korean,
                engTypeStatus: eng,
              })
            }
            key={i}
            style={{
              color: selected ? '#fff' : '#5EC0D9',
              backgroundColor: selected ? '#5EC0D9' : '#fff',
            }}
          >
            {korean}
          </Button>
        );
      })}
    </>
  );
}

export default HealthTypes;
