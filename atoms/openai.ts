import { OpenAIApi } from 'openai';
import { atom } from 'recoil';

const openAiAtom = atom<OpenAIApi | null>({
  key: 'openAiAtom',
  default: null,
});

export default openAiAtom;
