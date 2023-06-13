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
      {JOB_STATUS.map(({ korean, eng }, i) => {
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
              fontSize: '0.8rem',
              color: selected ? '#fff' : '#71C8A6',
              backgroundColor: selected ? '#71C8A6' : '#fff',
            }}
          >
            {korean}
          </Button>
        );
      })}
    </>
  );
}

export default JobTypes;
