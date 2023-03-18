import { atom } from 'recoil';

const modalAtom = atom<boolean>({
  key: 'modalAtom',
  default: false,
});

export default modalAtom;
