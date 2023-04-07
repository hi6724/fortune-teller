import React from 'react';
import { useRecoilValue } from 'recoil';
import resultAtom from '../atoms/result';
import { Button, Result } from 'antd';
import styled from '@emotion/styled';
import progressAtom from '../atoms/progress';
import {
  GENDER_COLORS,
  GENDER_MAP,
  MBTI_LIST,
  MBTI_TYPES_COLORS,
  colors,
  simpleShadow,
} from '../utils';
import { TYPE_COLORS } from '../utils';
import { TYPE_MAP } from '../utils';
import logo from '../assets/result.png';
import { color } from 'framer-motion';

function ResultPage() {
  const result = useRecoilValue(resultAtom);
  const { birthday, gender, mbti, type, typeStatus } =
    useRecoilValue(progressAtom);
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h3 style={{ color: TYPE_COLORS[TYPE_MAP[type]] }}>{type}꼬부기</h3>
        <MyImage src={logo.src} alt='' />
      </div>
      <div>
        <Title>당신의 운세</Title>
        <p
          style={{ fontWeight: 100, lineHeight: '1.2rem', fontSize: '0.9rem' }}
        >
          {result}
        </p>
      </div>

      <div>
        <Title>당신의 선택</Title>

        <SelectContainer>
          {MBTI_LIST.map((el, i) => {
            const mbtiType = Math.floor(i / 4 + 1);
            const mbtiColor = MBTI_TYPES_COLORS[mbtiType - 1];

            if (el == mbti)
              return <SelectCard color={mbtiColor}>{el}</SelectCard>;
          })}
          <SelectCard color={GENDER_COLORS[GENDER_MAP[gender]]}>
            {gender}
          </SelectCard>
          <SelectCard color={'#00BDFE'}>
            {birthday.format('YYYY-MM-DD')}
          </SelectCard>
          <SelectCard color={TYPE_COLORS[TYPE_MAP[type]]}>
            {typeStatus}
          </SelectCard>
        </SelectContainer>
      </div>

      <div
        style={{
          width: 'calc(100% - 8px)',
          display: 'grid',
          justifyContent: 'space-between',
          gridTemplateColumns: '50% 50%',
          gap: '8px',
        }}
      >
        <MyButton>다시하기</MyButton>
        <MyButton>공유하기</MyButton>
      </div>
    </Container>
  );
}

export default ResultPage;

const Container = styled.div`
  padding: 0 8px 2rem 8px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
type CardProps = {
  color: string;
};
const SelectCard = styled.div<CardProps>`
  background-color: ${(p) => p.color};
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${simpleShadow};
`;
const SelectContainer = styled.div`
  display: grid;
  justify-content: center;
  gap: 8px;
  grid-template-columns: 50% 50%;
`;
const Title = styled.h1`
  font-size: 2rem;
  padding: 8px 0;
  border-bottom: 1px solid ${colors.deepYellow};
  margin-bottom: 1rem;
`;
const MyImage = styled.img`
  height: 25vh;
`;
const MyButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9146ff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: ${simpleShadow};
  border: none;
  color: ${colors.yellow};
  font-size: 1.5rem;
`;
