import { atom } from 'recoil';

interface IResult {
  imgUrl: string;
  text: string;
}

const resultAtom = atom<IResult | null>({
  key: 'resultAtom',
  default: null,
});

export default resultAtom;
