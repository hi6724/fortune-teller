import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import progressAtom from '../atoms/progress';

function Birthday() {
  const router = useRouter();
  const [progressData, setProgress] = useRecoilState(progressAtom);
  useEffect(() => {
    // if (progressData.gender === '') router.replace('/');
    setProgress({ ...progressData, progress: 3 });
  }, []);
  return <div>Birthday</div>;
}

export default Birthday;
