import { Modal } from 'antd';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import modalAtom from '../atoms/modal';
import resultAtom from '../atoms/result';

function ResultModal() {
  const [open, setOpen] = useRecoilState(modalAtom);
  const result = useRecoilValue(resultAtom);
  return (
    <Modal title='Basic Modal' open={open} onCancel={() => setOpen(false)}>
      <p>{result?.text}</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}

export default ResultModal;
