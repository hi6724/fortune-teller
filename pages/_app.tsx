import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '../components/Navbar';
import { colors } from '../utils';
import { useGLTF } from '@react-three/drei';

function MyApp({ Component, pageProps }: AppProps) {
  useGLTF.preload('/sealife/scene.gltf');
  return (
    <RecoilRoot>
      <Analytics />

      <div
        style={{
          background: '#233d66',
          width: '100vw',
          height: '100vh',
          overflowX: 'hidden',
          color: colors.yellow,
        }}
      >
        <Navbar />
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}

export default MyApp;
