import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';

const UserInfoLoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async () => {
    try {
      const response = await axios.post('/api/mypage/userinfo/check-password', {
        userId: userId,
        password,
      });

      if (response.data) {
        navigate('/mypage/user-info');
      } else {
        setError('비밀번호가 잘못되었습니다.');
      }
    } catch (error) {
      console.error('로그인 요청 실패:', error);
      setError('로그인 요청에 실패했습니다.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLoginClick();
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2em', marginTop: '4em' }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography variant="h6" gutterBottom>
            비밀번호를 입력하세요
          </Typography>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8}>
            <TextField
              label="비밀번호"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              error={Boolean(error)}
              helperText={error ? '비밀번호가 잘못되었습니다.' : ' '}
              FormHelperTextProps={{ style: { height: '20px' } }}
              style={{ height: '56px' }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLoginClick}
              fullWidth
              style={{ height: '56px' }}
            >
              확인
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserInfoLoginPage;
