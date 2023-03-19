import dayjs from 'dayjs';
import { atom } from 'recoil';

const progressAtom = atom({
  key: 'progressAtom',
  default: {
    progress: 0,
    gender: '',
    mbti: '',
    birthday: dayjs('1996-01-01'),
    type: '',
    typeStatus: '',
  },
});

export default progressAtom;
