import { atom } from 'recoil';

const progressAtom = atom({
  key: 'progressAtom',
  default: {
    progress: 0,
    gender: '',
    mbti: '',
    birthday: '',
    type: '',
    typeStatus: '',
  },
});

export default progressAtom;
