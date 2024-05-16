import React, { ReactNode } from 'react';

import QBtn from '../../../styles/main/QuickBtn';

interface QuickBtnProps {
  btnName: string;
  children: ReactNode;
}

const QuickBtn: React.FC<QuickBtnProps> = (props) => {
  const { btnName, children } = props;

  return (
    <QBtn>
      {children}
      <span>{btnName}</span>
    </QBtn>
  );
};

export default QuickBtn;
