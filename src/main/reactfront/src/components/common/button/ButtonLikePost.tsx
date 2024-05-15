import React from 'react';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ButtonLikePostProps {
  //좋아요 버튼에 필요한 Props를 정의
  isLiked: boolean;
  likeNum: number;
  onClick: () => void;
}

const ButtonLikePost: React.FC<ButtonLikePostProps> = ({ isLiked, likeNum, onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<FavoriteIcon />}
      onClick={onClick}
      sx={{
        borderRadius: '20px', // 버튼의 모서리를 둥글게
        // padding: '6px 16px', // 버튼 내부 패딩 조정 (필요에 따라 조정)
        padding: 'auto',
        // '좋아요' 상태에 따라 스타일 변경
        backgroundColor: isLiked ? 'blue' : undefined,
        '&:hover': {
          backgroundColor: isLiked ? 'lightblue' : undefined, // 호버 상태에 대한 색상도 변경
        },
      }}
      // 좋아요가 눌렸는지에 따라 버튼의 스타일이나 텍스트를 변경할 수 있습니다.
      style={isLiked ? { backgroundColor: 'red' } : undefined}
    >
      {isLiked ? likeNum : likeNum}
    </Button>
  );
};
export default ButtonLikePost;
