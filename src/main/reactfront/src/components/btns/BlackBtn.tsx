import Button from '@mui/material/Button';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

export const BlackButton: React.FC<ButtonProps> = ({ onClick, label }) => (
  <Button
    style={{
      backgroundColor: 'rgb(33, 43, 54)',
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
