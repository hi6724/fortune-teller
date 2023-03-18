import type { NextPage } from 'next';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import openAiAtom from '../atoms/openai';
import { Button, Form, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Turtle from '../components/Turtle';
import resultAtom from '../atoms/result';
import dayjs from 'dayjs';
import ResultModal from '../components/ResultModal';
import modalAtom from '../atoms/modal';
import prevDataAtom from '../atoms/prevData';

const MBTI_LIST = [
  '선택안함',
  'ISTJ',
  'ISTP',
  'ISFJ',
  'ISFP',
  'INTJ',
  'INTP',
  'INFJ',
  'INFP',
  'ESTJ',
  'ESTP',
  'ESFJ',
  'ESEP',
  'ENTJ',
  'ENTP',
  'ENFJ',
  'ENFP',
];
const MBTI_DATA = {
  E: '외향적이고',
  I: '내향적이고',
  N: '감정적이고',
  S: '현실적이고',
  F: '공감능력이 뛰어나고',
  T: '사고능력이 뛰어나고',
  P: '즉흥적',
  J: '계획적',
};

const TYPE_LIST = ['취업', '사랑', '돈', '학업', '건강'];
const RANDOM_LIST = [
  '부정적인',
  '긍정적인',
  '친절한',
  '사악한',
  '장난스러운',
  '엄숙한',
  '날카로운',
  '부드러운',
];

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const setModalOpen = useSetRecoilState(modalAtom);
  const setResult = useSetRecoilState(resultAtom);
  const [prevData, setPrevData] = useRecoilState(prevDataAtom);

  const openai = useRecoilValue(openAiAtom);

  const handleSubmit = async (formData: any) => {
    const address = `${formData.mbti}/${formData.type}`;
    if (prevData[address]) {
      const prevDataDate = dayjs(prevData[address].date);
      if (prevDataDate.date() === dayjs().date()) {
        setModalOpen(true);
        setResult(prevData[address]);
        return;
      }
    }
    if (loading) return;
    setLoading(true);

    const personality = formData.mbti
      .split('')
      .map((m: keyof typeof MBTI_DATA) => MBTI_DATA[m])
      .join(' ');
    const speech = RANDOM_LIST[Math.floor(Math.random() * RANDOM_LIST.length)];
    const {
      data: { choices },
    }: any = await openai?.createCompletion({
      model: 'text-davinci-003',
      prompt: `당신은 오늘 25살인 대한민국 사람입니다. 당신의 성격은 ${personality}입니다. 당신의 오늘의 운세를 ${formData.type}과 관련해서 ${speech} 말투로 알려주세요.`,
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      user: 'hunmok',
    });

    const tempResult = {
      text: choices[0].text as string,
      imgUrl: '',
      date: dayjs().format('YYYY-MM-DD'),
    };

    setResult(tempResult);
    localStorage.setItem('ssafy-gpt-result', JSON.stringify(tempResult));

    let newData = Object.entries(prevData);
    newData.push([address, tempResult]);
    localStorage.setItem(
      'ssafy-gpt-result',
      JSON.stringify(Object.fromEntries(newData))
    );
    setPrevData(Object.fromEntries(newData));
    setResult(tempResult);
    setModalOpen(true);
    setLoading(false);
  };

  useEffect(() => {
    const localData: any = localStorage.getItem('ssafy-gpt-result');
    if (!localData) return;
    setPrevData(JSON.parse(localData));
  }, []);

  return (
    <div>
      <Canvas style={{ height: '40vh' }}>
        <Turtle />
      </Canvas>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name='mbti'
          rules={[{ required: true, message: 'MBTI를 알려주세요' }]}
        >
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder='MBTI를 선택해주세요'
            optionLabelProp='label'
          >
            {MBTI_LIST.map((mbti) => (
              <Select.Option key={mbti} value={mbti} label={mbti}>
                <Space>{mbti}</Space>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name='type'
          rules={[{ required: true, message: '운세종목을 알려주세요' }]}
        >
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder='어떤 운세가 궁금하신가요?'
            optionLabelProp='label'
          >
            {TYPE_LIST.map((type) => (
              <Select.Option key={type} value={type} label={type}>
                <Space>{type}</Space>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit'>SUBMIT</Button>
        </Form.Item>
      </Form>
      <ResultModal />
      {loading && (
        <div
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            color: 'rgba(0,0,0,0.6)',
          }}
        >
          Loading...
        </div>
      )}
    </div>
  );
};

export default Home;
