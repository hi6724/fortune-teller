import { atom } from 'recoil';

interface IData {
  imgUrl: string;
  text: string;
  date: string;
}
interface IPrevData {
  [key: string]: IData;
}
const prevDataAtom = atom<IPrevData>({
  key: 'prevDataAtom',
  default: {},
});

export default prevDataAtom;
