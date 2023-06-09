/* eslint-disable  */

import { Card } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';
import { colors } from '../utils';
import { female, male, no_gender } from '../assets/gender/index';
import { useMobile } from '../hooks/useMobile';

function Gender() {
  const router = useRouter();
  const isMobile = useMobile();

  const [progressData, setProgress] = useRecoilState(progressAtom);
  useEffect(() => {
    setProgress({ ...progressData, progress: 1 });
  }, []);

  const handleClick = (gender: string) => () => {
    setProgress({ ...progressData, gender });
    router.push('/mbti');
  };
  return (
    <div style={{ padding: isMobile ? '0 5vw' : '0 30px' }}>
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
        성별을 알려주세요
      </h6>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Card
          onClick={handleClick('남자')}
          style={{
            width: '30%',
            boxShadow:
              progressData.gender === '남자'
                ? 'rgba(3, 102, 214, 1) 0px 0px 0px 6px'
                : '',
          }}
          bodyStyle={{
            padding: '4px',
            border: 'none',
          }}
          cover={<img alt='example' src={male.src} />}
        >
          <Card.Meta title='남자' />
        </Card>
        <Card
          onClick={handleClick('여자')}
          style={{
            width: '30%',
            boxShadow:
              progressData.gender === '여자'
                ? 'rgba(3, 102, 214, 1) 0px 0px 0px 6px'
                : '',
          }}
          bodyStyle={{ padding: '4px' }}
          cover={<img alt='example' src={female.src} />}
        >
          <Card.Meta title='여자' />
        </Card>
        <Card
          onClick={handleClick('선택안함')}
          style={{
            width: '30%',
            boxShadow:
              progressData.gender === '선택안함'
                ? 'rgba(3, 102, 214, 1) 0px 0px 0px 6px'
                : '',
          }}
          bodyStyle={{ padding: '4px' }}
          cover={<img alt='example' src={no_gender.src} />}
        >
          <Card.Meta title='선택안함' />
        </Card>

        {/* <Button
          type={progressData.gender === '남자' ? 'primary' : 'default'}
          onClick={handleClick('남자')}
        >
          남자
        </Button>
        <Button
          type={progressData.gender === '여자' ? 'primary' : 'default'}
          onClick={handleClick('여자')}
        >
          여자
        </Button>
        <Button
          type={progressData.gender === '선택안함' ? 'primary' : 'default'}
          onClick={handleClick('선택안함')}
        >
          선택안함
        </Button> */}
      </div>
    </div>
  );
}

export default Gender;
