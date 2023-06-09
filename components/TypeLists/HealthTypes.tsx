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
      {HEALTH_STATUS.map((healthStatus, i) => {
        const selected = progressData.typeStatus === healthStatus;

        return (
          <Button
            size={!isMobile ? 'large' : 'middle'}
            type={
              progressData.typeStatus === healthStatus ? 'primary' : 'default'
            }
            onClick={() =>
              setProgress({ ...progressData, typeStatus: healthStatus })
            }
            key={i}
            style={{
              color: selected ? '#fff' : '#5EC0D9',
              backgroundColor: selected ? '#5EC0D9' : '#fff',
            }}
          >
            {healthStatus}
          </Button>
        );
      })}
    </>
  );
}

export default HealthTypes;
