import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Divider,
  InputAdornment,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import kakao from '../../assets/img/signin/kakao.png';
import google from '../../assets/img/signin/google.png';
import naver from '../../assets/img/signin/naver.png';

import GenericButton from '../../components/common/genericButton/GenericButton';
import {
  LoginButtons,
  LoginForm,
  SocialIcon,
  SocialIconsContainer,
} from '../../styles/signin/SigninPage.styles';

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  //이메일, 패스워드 확인
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //이메일,비밀전호 폼 누락되있으면 로그인 안댐!
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    } else if (!password) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    console.log({ email, password });
    //로그인 성공시 메인화면 페이지로 이동.
    navigate('/');
  };

  return (
    <LoginForm>
      <Typography sx={{ fontWeight: 'bold' }} variant="h4" textAlign="center">
        로그인
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            label="이메일"
            name="email"
            placeholder="Email address"
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
            InputProps={{
              style: {
                borderRadius: '12px',
              },
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& label.Mui-focused': {
                color: 'black',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                  borderWidth: 1,
                },
              },
            }}
          />
          <TextField
            placeholder="Password"
            margin="normal"
            label="비밀번호"
            name="password"
            type="password"
            fullWidth
            onChange={(event) => setPassword(event.target.value)}
            InputProps={{
              style: {
                borderRadius: '12px',
              },
              startAdornment: (
                <InputAdornment position="start">
                  <KeyIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              '& label.Mui-focused': {
                color: 'black',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                  borderWidth: 1,
                },
              },
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mt: 2,
            }}
          >
            <LoginButtons>
              <Link to="/signup" style={{ width: '48%' }}>
                <GenericButton
                  style={{ fontSize: '1.1rem', width: '100%', height: '40px' }}
                >
                  회원 가입
                </GenericButton>
              </Link>
              <GenericButton
                style={{ fontSize: '1.1rem', width: '48%', height: '40px' }}
                type="submit"
              >
                로그인
              </GenericButton>
            </LoginButtons>
          </Box>
        </Box>
      </form>

      <Divider sx={{ width: '100%' }}>SNS 계정 로그인</Divider>

      <SocialIconsContainer>
        <SocialIcon>
          <a href="#" />
          <img alt="KakaoTalk" width={40} src={kakao} />
        </SocialIcon>
        <SocialIcon>
          <a href="#" />
          <img alt="Naver" width={40} src={naver} />
        </SocialIcon>
        <SocialIcon>
          <a href="#" />
          <img alt="Google" width={40} src={google} />
        </SocialIcon>
      </SocialIconsContainer>
      <Typography
        variant="body2"
        sx={{ marginBottom: '20px', marginTop: '20px', textAlign: 'center' }}
      >
        <Link
          to="/client-service"
          style={{
            marginRight: '10px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          개인정보 처리방침
        </Link>
        |
        <Link
          to="/client-service"
          style={{
            margin: '0 10px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          이용약관
        </Link>
        |
        <Link
          to="/client-service"
          style={{
            marginLeft: '10px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          회원정보 고객센터
        </Link>
      </Typography>
    </LoginForm>
  );
};

export default SigninPage;
