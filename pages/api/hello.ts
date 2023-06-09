import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  organization: 'org-76QP5sXmWL0aWRoff1z5kwaW',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
// const response = await openai.listEngines();

import type { NextApiRequest, NextApiResponse } from 'next';
import { IScanData } from '../../type';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: IScanData;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  const { body } = req;
  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${body.detail_type} 성격이 ${body.mbti}인 ${body.gender}에게 ${body.status_type}에 관련된 조언을 2가지 해줘.`,
    max_tokens: 512,
    temperature: 0,
  });

  res.send(response.data.choices[0].text);
}
