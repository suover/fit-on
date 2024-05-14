import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';

interface AuthorInfoProps {
  imageUrl: string;
  userName: string;
  createTimeInfo: string;
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ imageUrl, userName, createTimeInfo }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar src={imageUrl} alt={userName} />
      <Typography variant="h6" fontWeight="bold">
        {userName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {createTimeInfo}
      </Typography>
    </Box>
  );
};
export default AuthorInfo;
