import { Button } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../../atoms/progress';
import { HEALTH_STATUS } from '../../utils';

function HealthTypes() {
  const [progressData, setProgress] = useRecoilState(progressAtom);

  return (
    <div>
      {HEALTH_STATUS.map((healthStatus, i) => (
        <Button
          type={
            progressData.typeStatus === healthStatus ? 'primary' : 'default'
          }
          onClick={() =>
            setProgress({ ...progressData, typeStatus: healthStatus })
          }
          key={i}
        >
          {healthStatus}
        </Button>
      ))}
    </div>
  );
}

export default HealthTypes;
