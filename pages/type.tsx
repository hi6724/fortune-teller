import { Button, notification, Alert } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';
import HealthTypes from '../components/TypeLists/HealthTypes';
import JobTypes from '../components/TypeLists/JobTypes';
import LoveTypes from '../components/TypeLists/LoveTypes';

function Type() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: <span style={{ color: 'tomato' }}>현재상태를 알려주세요</span>,
      icon: <span></span>,
      placement,
    });
  };

  const router = useRouter();
  const [progressData, setProgress] = useRecoilState(progressAtom);
  useEffect(() => {
    if (progressData.mbti === '') router.replace('/mbti');
    setProgress({ ...progressData, progress: 4 });
  }, []);
  const submit = () => {
    if (progressData.type === '' || progressData.typeStatus === '') {
      openNotification('top');
      return;
    }
    router.push('/result');
  };
  return (
    <>
      <div>
        {['사랑', '취업', '건강'].map((type) => (
          <Button
            type={progressData.type === type ? 'primary' : 'default'}
            onClick={() => setProgress({ ...progressData, type })}
            key={type}
          >
            {type}
          </Button>
        ))}
        {progressData.type === '사랑' ? (
          <LoveTypes />
        ) : progressData.type === '취업' ? (
          <JobTypes />
        ) : progressData.type === '건강' ? (
          <HealthTypes />
        ) : null}
        {progressData.type !== '' && progressData.typeStatus !== '' && (
          <Button onClick={submit}>최종제출</Button>
        )}
      </div>
      {contextHolder}
    </>
  );
}

export default Type;
