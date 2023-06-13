import { Configuration, OpenAIApi } from 'openai';
import { IScanData } from '../type';
import axios from 'axios';

const configuration = new Configuration({
  organization: 'org-76QP5sXmWL0aWRoff1z5kwaW',
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
export const genImageByText = async (data: IScanData): Promise<any> => {
  const res = axios.post(
    'https://api.stability.ai/v1/generation/stable-diffusion-xl-beta-v2-2-2/text-to-image',
    {
      cfg_scale: 10,
      height: 512,
      width: 512,
      samples: 1,
      steps: 75,
      text_prompts: [
        {
          text: `${data.status_eng}, unreal engine, super cute, masterpeace, artstation, detailed, design by mark ryden and pixar and hayao miyazaki, unreal 5`,
          weight: 1,
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STABLE_DIFFUSION_KEY}`,
      },
    }
  );
  return res;
};

export const fetchCheeringFromGPT = async (data: IScanData): Promise<any> => {
  const openai = new OpenAIApi(configuration);
  const res = openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${data.detail_type} ${data.mbti}를 응원하는 짧은 한마디를 ${data.status_type}과 연관시켜서 해줘.`,
    max_tokens: 256,
    temperature: 0,
  });
  return res;
};
