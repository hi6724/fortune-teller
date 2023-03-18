import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { Configuration, OpenAIApi } from 'openai';
import openAiAtom from '../atoms/openai';

const configuration = new Configuration({
  organization: 'org-3Fl56tEsfLxfA1Wb5h5byRvf',
  apiKey: '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',
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
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
