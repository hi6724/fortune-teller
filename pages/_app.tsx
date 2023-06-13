import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '../components/Navbar';
import { colors } from '../utils';
import { useGLTF } from '@react-three/drei';
import { useMobile } from '../hooks/useMobile';
import { motion } from 'framer-motion';
import GoogleAnalytics from '../components/GoogleAnalytics';

function MyApp({ Component, pageProps }: AppProps) {
  useGLTF.preload('/sealife/scene.gltf');
  const isMobile = useMobile();

  return (
    <>
      <GoogleAnalytics />
      <RecoilRoot>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            width: '100vw',
            height: '100vh',
          }}
        >
          <img
            src='/bg.jpg'
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              width: 'calc(100vw - 600px)',
              height: '100vh',
              objectFit: 'cover',
            }}
          />
          {!isMobile ? (
            <motion.div
              style={{
                position: 'fixed',
                left: 50,
                borderRadius: 16,
                top: '10%',
                height: '150px',
                width: 'calc(100vw - 700px)',
                zIndex: 10,
                background: 'rgba(255,255,255,0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 3, duration: 1.5 }}
            >
              본 사이트는 모바일 환경에 최적화 되어있습니다.
            </motion.div>
          ) : null}
          <Analytics />
          <div
            style={{
              background: '#233d66',
              width: '100%',
              height: '100%',
              maxWidth: '600px',
              overflowX: 'hidden',
              color: colors.yellow,
              zIndex: 99,
            }}
          >
            <Navbar />
            <Component {...pageProps} />
          </div>
        </div>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
