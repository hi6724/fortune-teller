import { atom } from 'recoil';

const resultAtom = atom<string>({
  key: 'resultAtom',
  default: '',
});

export default resultAtom;
