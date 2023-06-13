import dayjs from 'dayjs';
import { atom } from 'recoil';

const progressAtom = atom({
  key: 'progressAtom',
  default: {
    progress: 0,
    gender: '',
    mbti: '',
    birthday: dayjs('2000-01-01'),
    type: '',
    typeStatus: '',
    engTypeStatus: '',
  },
});

export default progressAtom;
