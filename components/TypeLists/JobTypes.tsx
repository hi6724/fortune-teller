import { Button } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../../atoms/progress';
import { JOB_STATUS } from '../../utils';

function JobTypes() {
  const [progressData, setProgress] = useRecoilState(progressAtom);

  return (
    <div>
      {JOB_STATUS.map((jobStatus, i) => (
        <Button
          type={progressData.typeStatus === jobStatus ? 'primary' : 'default'}
          onClick={() =>
            setProgress({ ...progressData, typeStatus: jobStatus })
          }
          key={i}
        >
          {jobStatus}
        </Button>
      ))}
    </div>
  );
}

export default JobTypes;
