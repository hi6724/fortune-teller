import { Button, notification, Alert } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';
import HealthTypes from '../components/TypeLists/HealthTypes';
import JobTypes from '../components/TypeLists/JobTypes';
import LoveTypes from '../components/TypeLists/LoveTypes';
import styled from '@emotion/styled';
import { TYPE_COLORS, TYPE_MAP, colors, simpleShadow } from '../utils';
import axios from 'axios';
import resultAtom from '../atoms/result';

function Type() {
  const [api, contextHolder] = notification.useNotification();
  const setResult = useSetRecoilState(resultAtom);

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: <span style={{ color: 'tomato' }}>현재상태를 알려주세요</span>,
      icon: <span></span>,
      placement,
    });
  };

  const router = useRouter();
  const [progressData, setProgress] = useRecoilState(progressAtom);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (progressData.mbti === '') router.replace('/mbti');
    setProgress({ ...progressData, progress: 4 });
  }, []);

  const submit = async () => {
    if (progressData.type === '' || progressData.typeStatus === '') {
      openNotification('top');
      return;
    }
    if (loading) return;
    setLoading(true);
    const data = {
      gender: progressData.gender,
      mbti: progressData.mbti,
      birth_year: progressData.birthday.year() + '',
      birth_month: progressData.birthday.month() + '',
      birth_day: progressData.birthday.date() + '',
      status_type: progressData.type,
      detail_type: progressData.typeStatus,
    };

    const { data: result } = await axios.post(
      'https://ggobukine.onrender.com',
      data
    );
    setResult(result);
    router.push('/result');
  };
  return (
    <>
      {loading && <LoadingContainer>LOADING...</LoadingContainer>}
      <div style={{ padding: '0 5vw' }}>
        <TypeContainer
          style={{ borderColor: TYPE_COLORS[TYPE_MAP[progressData.type]] }}
        >
          {['사랑', '취업', '건강'].map((type, i) => {
            const selected = progressData.type === type;
            return (
              <Button
                type={selected ? 'primary' : 'default'}
                onClick={() =>
                  setProgress({ ...progressData, type, typeStatus: '' })
                }
                key={type}
                style={{
                  borderColor: TYPE_COLORS[i],
                  background: selected ? TYPE_COLORS[i] : '#fff',
                  color: selected ? '#fff' : TYPE_COLORS[i],
                  width: '30vw',
                }}
              >
                {type}
              </Button>
            );
          })}
        </TypeContainer>
        <StatusContainer>
          {progressData.type === '사랑' ? (
            <LoveTypes />
          ) : progressData.type === '취업' ? (
            <JobTypes />
          ) : progressData.type === '건강' ? (
            <HealthTypes />
          ) : null}
        </StatusContainer>
        {progressData.type !== '' && progressData.typeStatus !== '' && (
          <Button
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              left: '5vw',
              width: '90vw',
              height: '3rem',
              color: '#fff',
              fontWeight: '600',
              fontSize: '1rem',
              backgroundColor: colors.lightGreen,
              border: 'none',
              borderRadius: '100rem',
            }}
            onClick={submit}
          >
            <h1 style={{ textShadow: simpleShadow }}>최종제출</h1>
          </Button>
        )}
      </div>
      {contextHolder}
    </>
  );
}

export default Type;

const TypeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid black;
  margin-bottom: 1rem;
  gap: 1rem;
`;
const StatusContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
`;
const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9;
`;