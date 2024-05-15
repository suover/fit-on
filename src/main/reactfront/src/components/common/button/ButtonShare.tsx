import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

interface ButtonShareProps {
  //좋아요 버튼에 필요한 Props를 정의
  Shared: boolean;
  onClick: () => void;
}

const ButtonShare: React.FC<ButtonShareProps> = ({ Shared, onClick }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleShareClick = () => {
    onClick(); // 상태 변화를 외부로 전달
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Button
        startIcon={<ShareIcon />}
        onClick={handleShareClick}
        variant="contained"
        color="primary"
        sx={{
          borderRadius: '20px', // 버튼의 모서리를 둥글게
          padding: 'auto', // 버튼 내부 패딩 조정 (필요에 따라 조정)
          backgroundColor: Shared ? 'red' : 'primary.main', // Shared 상태에 따라 색상 변경
          '&:hover': {
            backgroundColor: Shared ? 'darkred' : 'primary.dark', // 호버 상태에 대한 색상 변경
          },
        }}
      ></Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // 자동으로 닫히는 시간설정
        onClose={handleCloseSnackbar}
        message="공유되었습니다."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // 위치 조정
      />
    </>
  );
};

export default ButtonShare;
