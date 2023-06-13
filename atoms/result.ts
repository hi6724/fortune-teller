import { atom } from 'recoil';
export interface IResult {
  text?: string | null;
  image?: any;
}

const resultAtom = atom<IResult>({
  key: 'resultAtom',
  default: { text: null, image: null },
});

export default resultAtom;
