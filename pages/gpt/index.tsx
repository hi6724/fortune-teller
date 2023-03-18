import React from 'react';
import { useRecoilValue } from 'recoil';
import openAiAtom from '../../atoms/openai';

function Gpt() {
  const openai = useRecoilValue(openAiAtom);
  console.log(openai);
  return <div>Gpt</div>;
}

export default Gpt;
