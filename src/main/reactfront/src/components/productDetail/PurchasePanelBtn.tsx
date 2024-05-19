import React from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
  onClick: () => void;
  label: string;
  bgColor: string; // 배경색을 props로 추가
}

export const PurchasePanelBtn: React.FC<ButtonProps> = ({
  onClick,
  label,
  bgColor,
}) => (
  <Button
    style={{
      backgroundColor: bgColor, // props로 받은 배경색 사용
      color: 'white',
      minWidth: '200px', // 버튼의 최소 너비 설정
      width: '100%',
    }}
    onClick={onClick}
    size="large"
  >
    {label}
  </Button>
);
