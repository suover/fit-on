import Button from '@mui/material/Button';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

export const YellowButton: React.FC<ButtonProps> = ({ onClick, label }) => (
  <Button
    style={{
      backgroundColor: 'rgb(255, 171, 0)',
      color: 'white',
      minWidth: '200px', // 버튼의 최소 너비 설정
      width: '100%', // 버튼을 컨테이너의 전체 너비로 확장
    }}
    onClick={onClick}
    size="large"
  >
    {label}
  </Button>
);
