import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Configuration, OpenAIApi } from 'openai';
import openAiAtom from '../atoms/openai';
import Navbar from '../components/Navbar';
import { colors } from '../utils';

const configuration = new Configuration({
  organization: 'org-3Fl56tEsfLxfA1Wb5h5byRvf',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  username: 'hunmok',
});
const openai = new OpenAIApi(configuration);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot
      initializeState={({ set }) => {
        set(openAiAtom, openai);
      }}
    >
      <div
        style={{
          background: colors.green,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
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
