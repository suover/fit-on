import React, { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

interface ButtonShareProps {
  isShared: boolean;
  shareNum: number;
  onClick: () => void;
}

const ButtonShare: React.FC<ButtonShareProps> = ({
  isShared,
  shareNum,
  onClick,
}) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleShareClick = () => {
    onClick();
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
          width: '70px',
          height: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          paddingRight: '5px',
          backgroundColor: isShared ? 'red' : 'primary.main',
          '&:hover': {
            backgroundColor: isShared ? 'darkred' : 'primary.dark',
          },
        }}
      >
        {shareNum}
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={1}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default ButtonShare;
