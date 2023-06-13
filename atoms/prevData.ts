import dayjs from 'dayjs';
import { atom } from 'recoil';
import { IResult } from './result';

const prevDataAtom = atom({
  key: 'prevDataAtom',
  default: {
    result: null as IResult | null,
    date: dayjs(),
    params: {
      progress: 0,
      gender: '',
      mbti: '',
      birthday: dayjs(),
      type: '',
      typeStatus: '',
      engTypeStatus: '',
    },
  },
});

export default prevDataAtom;
