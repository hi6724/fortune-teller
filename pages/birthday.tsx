/* eslint-disable  */

import { Button, Calendar } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';
import styled from '@emotion/styled';
import paper from '../assets/paper.png';
import { colors, simpleShadow } from '../utils';

function Birthday() {
  const router = useRouter();
  const [progressData, setProgress] = useRecoilState(progressAtom);
  const [dayObj, setDayObj] = useState(dayjs());

  const onChange = (value: Dayjs) => setDayObj(value);

  useEffect(() => {
    if (progressData.mbti === '') router.replace('/mbti');
    setProgress({ ...progressData, progress: 3 });
    setDayObj(progressData.birthday);
  }, []);

  const handleNext = () => {
    setProgress({
      ...progressData,
      birthday: dayjs(dayObj),
    });
    router.push('/type');
  };
  return (
    <div style={{ padding: '0 0 5rem 0' }}>
      <div style={{ padding: '1.5rem', position: 'relative' }}>
        <Title>생일을 알려주세요</Title>
        <img
          style={{ width: '100vw', position: 'absolute', top: 0, left: 0 }}
          src={paper.src}
          alt=''
        />
        <MyCalendar
          onChange={onChange}
          fullscreen={false}
          // locale={locale}
          defaultValue={dayObj}
          value={dayObj}
          // onChange={onChange}
          dateFullCellRender={(date) => {
            const currentFullDate = dayObj.format('YYYY/MM/DD');
            const currentMonth = dayObj.month();
            const day = date.day();
            const selected = currentFullDate == date.format('YYYY/MM/DD');

            const color = selected
              ? '#fff'
              : day === 0
              ? 'tomato'
              : day === 6
              ? '#00009C'
              : '#000000';
            const backgroundColor = selected ? '#00BDFE' : 'transparent';
            const borderRadius = selected ? '12px' : '';
            const opacity = date.month() != currentMonth ? 0.3 : 1;

            return (
              <div
                style={{
                  color,
                  backgroundColor,
                  opacity,
                  borderRadius,
                  aspectRatio: 1,
                  fontFamily: 'NEXON',
                  fontWeight: '600',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0px',
                  height: '32px',
                }}
              >
                <span>{date.date()}</span>
                {/* {circle && (
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      background: 'tomato',
                      borderRadius: '50%',
                    }}
                  />
                )} */}
              </div>
            );
          }}
        />
      </div>
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
        onClick={handleNext}
      >
        <h1 style={{ textShadow: simpleShadow }}>다음으로</h1>
      </Button>
    </div>
  );
}

export default Birthday;

const Title = styled.h1`
  position: absolute;
  z-index: 99;
  top: 5rem;
  font-size: 1.5rem;
  color: ${'#000'};
`;
const MyCalendar = styled(Calendar)`
  padding: 6rem 1rem 1rem 1rem;

  .ant-picker-calendar-mode-switch {
    display: none;
  }
  .ant-select-selector {
    display: flex !important;
    align-items: center !important;
    height: 2.2rem !important;
    background-color: rgba(203, 159, 104, 0.6) !important;
  }
`;
