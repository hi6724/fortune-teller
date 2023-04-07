/* eslint-disable  */

import { Button, Progress, Typography } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { useRecoilValue } from 'recoil';
import progressAtom from '../atoms/progress';
import { colors } from '../utils';
import { LeftOutlined } from '@ant-design/icons';
import logo from '../assets/hhhh.png';

function Navbar() {
  const { progress } = useRecoilValue(progressAtom);
  const router = useRouter();
  return (
    <div style={{ height: '8rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2vh 5%',
        }}
      >
        <span onClick={() => router.back()}>
          <LeftOutlined style={{ fontSize: '1.2rem' }} />
        </span>
        {/* <h1 style={{ fontSize: '1.5rem', color: colors.yellow }}>꼬북이네</h1> */}
        <img
          src={logo.src}
          style={{ width: '13rem', objectFit: 'cover' }}
          alt=''
          onClick={() => router.push('/')}
        />
        <div>{progress}/4</div>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1vh',
        }}
      >
        <Progress
          style={{ width: '90%' }}
          percent={(progress * 100) / 4}
          size='small'
          showInfo={false}
          strokeColor={{ from: '#108ee9', to: '#87d068' }}
          trailColor='rgba(0,0,0,0.4)'
        />
      </div>
    </div>
  );
}

export default Navbar;
