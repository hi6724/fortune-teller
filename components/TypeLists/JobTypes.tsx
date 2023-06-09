import { Button } from 'antd';
import React from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../../atoms/progress';
import { JOB_STATUS } from '../../utils';
import { useMobile } from '../../hooks/useMobile';

function JobTypes() {
  const [progressData, setProgress] = useRecoilState(progressAtom);
  const isMobile = useMobile();
  return (
    <>
      {JOB_STATUS.map((jobStatus, i) => {
        const selected = progressData.typeStatus === jobStatus;

        return (
          <Button
            size={! isMobile ? 'large' : 'middle'}
            type={progressData.typeStatus === jobStatus ? 'primary' : 'default'}
            onClick={() =>
              setProgress({ ...progressData, typeStatus: jobStatus })
            }
            key={i}
            style={{
              fontSize: '0.8rem',
              color: selected ? '#fff' : '#71C8A6',
              backgroundColor: selected ? '#71C8A6' : '#fff',
            }}
          >
            {jobStatus}
          </Button>
        );
      })}
    </>
  );
}

export default JobTypes;
