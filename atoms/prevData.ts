import dayjs from 'dayjs';
import { atom } from 'recoil';

const prevDataAtom = atom({
  key: 'prevDataAtom',
  default: {
    result: '',
    date: dayjs(),
    params: {
      progress: 0,
      gender: '',
      mbti: '',
      birthday: dayjs(),
      type: '',
      typeStatus: '',
    },
  },
});

export default prevDataAtom;
