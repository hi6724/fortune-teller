/* eslint-disable  */

import { Button } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';
import { MBTI_LIST, MBTI_TYPES, MBTI_TYPES_COLORS, colors } from '../utils';
import styled from '@emotion/styled';
import { useMobile } from '../hooks/useMobile';

function Mbti() {
  const router = useRouter();
  const isMobile = useMobile();

  const [progressData, setProgress] = useRecoilState(progressAtom);
  useEffect(() => {
    if (progressData.gender === '') router.replace('/');
    setProgress({ ...progressData, progress: 2 });
  }, []);

  const handleClick = (mbti: string) => () => {
    setProgress({ ...progressData, mbti });
    router.push('/type');
  };
  return (
    <div>
      <h1
        style={{
          fontWeight: '600',
          fontSize: '1.5rem',
          wordBreak: 'keep-all',
          textAlign: 'center',
          marginBottom: '3vh',
        }}
      >
        꼬북이가 힘이나는 한마디를 해줄거에요!
      </h1>
      <h6
        style={{
          textAlign: 'center',
          marginBottom: '3vh',
          color: colors.deepYellow,
        }}
      >
        MBTI를 알려주세요
      </h6>
      <MbtiContainer>
        {MBTI_LIST.map((mbti, i) => {
          const mbtiType = Math.floor(i / 4 + 1);
          const mbtiColor = MBTI_TYPES_COLORS[mbtiType - 1];
          const color = progressData.mbti !== mbti ? '#fff' : mbtiColor;
          const background = progressData.mbti !== mbti ? mbtiColor : '#fff';
          if (i % 4 === 0 && i < 16)
            return (
              <>
                <h1
                  style={{
                    color: MBTI_TYPES_COLORS[mbtiType - 1],
                    borderBottomColor: MBTI_TYPES_COLORS[mbtiType - 1],
                  }}
                >
                  {MBTI_TYPES[mbtiType - 1]}
                </h1>
                <Button
                  size={isMobile ? 'middle' : 'large'}
                  onClick={handleClick(mbti)}
                  value={mbti}
                  type={progressData.mbti === mbti ? 'primary' : 'default'}
                  key={mbti}
                  style={{ color, background }}
                >
                  {mbti}
                </Button>
              </>
            );
          return (
            <>
              <Button
                size={isMobile ? 'middle' : 'large'}
                onClick={handleClick(mbti)}
                value={mbti}
                type={progressData.mbti === mbti ? 'primary' : 'default'}
                key={mbti}
                style={{ color, background }}
              >
                {mbti}
              </Button>
            </>
          );
        })}
      </MbtiContainer>
    </div>
  );
}

export default Mbti;

const MbtiContainer = styled.div`
  padding: 8px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 8px;
  h1 {
    color: #90759f;
    font-size: 1.4rem;
    padding: 8px 0;
    border-bottom: 1px solid black;
    grid-column: 1 / 5;
  }
`;
