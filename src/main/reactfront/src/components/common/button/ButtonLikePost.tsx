import React from 'react';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface ButtonLikePostProps {
  isLiked: boolean;
  likeNum: number;
  onClick: () => void;
}

const ButtonLikePost: React.FC<ButtonLikePostProps> = ({
  isLiked,
  likeNum,
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<FavoriteIcon />}
      onClick={onClick}
      sx={{
        width: '70px',
        height: '40px',
        borderRadius: '20px',
        padding: 'auto',
        backgroundColor: isLiked ? 'blue' : undefined,
        '&:hover': {
          backgroundColor: isLiked ? 'lightblue' : undefined,
        },
      }}
      style={isLiked ? { backgroundColor: 'red' } : undefined}
    >
      {likeNum}
    </Button>
  );
};

export default ButtonLikePost;
