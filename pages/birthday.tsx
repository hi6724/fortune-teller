import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';

function Birthday() {
  const router = useRouter();
  const [progressData, setProgress] = useRecoilState(progressAtom);
  const [birthday, setBirthday] = useState<any>();
  useEffect(() => {
    if (progressData.mbti === '') router.replace('/mbti');
    setProgress({ ...progressData, progress: 3 });
    setBirthday(progressData.birthday);
  }, []);

  const handleNext = (date: any) => {
    setProgress({
      ...progressData,
      birthday: dayjs(date),
    });
    router.push('/type');
  };

  return (
    <div>
      Birthday
      <div>
        <DatePicker value={progressData.birthday} onChange={handleNext} />
      </div>
    </div>
  );
}

export default Birthday;
