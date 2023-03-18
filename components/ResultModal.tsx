import { Modal } from 'antd';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import modalAtom from '../atoms/modal';
import resultAtom from '../atoms/result';

function ResultModal() {
  const [open, setOpen] = useRecoilState(modalAtom);
  const result = useRecoilValue(resultAtom);
  return (
    <Modal title='오늘의 운세' open={open} onCancel={() => setOpen(false)}>
      <p>{result?.text}</p>
    </Modal>
  );
}

export default ResultModal;
