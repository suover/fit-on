import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Typography,
  Divider,
  InputAdornment,
  Button,
  Dialog,
  DialogContent,
  Tab,
  Tabs,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import kakao from '../../assets/img/signin/kakao.png';
import axios from '../../api/axiosConfig';
import GenericButton from '../../components/common/genericButton/GenericButton';
import {
  LoginButtons,
  LoginForm,
  SocialIcon,
  SocialIconsContainer,
} from '../../styles/signin/SigninPage.styles';
import AuthContext from '../../context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NaverLoginButton from '../../components/naverLogin/NaverLoginButton';
import GoogleLoginButton from '../../components/googleLogin/GoogleLoginButton';
import KakaoLoginButton from '../../components/kakaoLogin/KakaoLoginButton';

const FindEmailForm = () => (
  <Box>
    <Typography variant="h6">이메일 찾기</Typography>
    <TextField
      label="이름"
      placeholder="이름을 입력해주세요 (예: 홍길동)"
      variant="outlined"
      fullWidth
      margin="normal"
    />
    <TextField
      label="휴대폰 번호"
      placeholder="휴대폰 번호를 입력해주세요 (예: 01012345678)"
      variant="outlined"
      fullWidth
      margin="normal"
    />
    <TextField
      label="생년월일"
      type="date"
      variant="outlined"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      sx={{ marginBottom: '35px' }}
    />
    <Button variant="contained" color="primary" fullWidth>
      이메일 찾기
    </Button>
  </Box>
);

const FindPasswordForm = () => (
  <Box>
    <Typography variant="h6">비밀번호 찾기</Typography>
    <TextField
      label="이메일"
      placeholder="이메일을 입력해주세요 (예: abc123@naver.com)"
      variant="outlined"
      fullWidth
      margin="normal"
    />
    <TextField
      label="이름"
      placeholder="이름을 입력해주세요 (예: 홍길동)"
      variant="outlined"
      fullWidth
      margin="normal"
    />
    <TextField
      label="휴대폰 번호"
      placeholder="휴대폰 번호를 입력해주세요 (예: 01012345678)"
      variant="outlined"
      fullWidth
      margin="normal"
      sx={{ marginBottom: '35px' }}
    />
    <Button variant="contained" color="primary" fullWidth>
      비밀번호 찾기
    </Button>
  </Box>
);

interface EmailPasswordModalProps {
  open: boolean;
  handleClose: () => void;
}

const EmailPasswordModal: React.FC<EmailPasswordModalProps> = ({
  open,
  handleClose,
}) => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          minWidth: '500px',
          minHeight: '300px',
        },
      }}
    >
      <DialogContent>
        <Tabs value={tabValue} onChange={handleChange} centered>
          <Tab label="이메일 찾기" />
          <Tab label="비밀번호 찾기" />
        </Tabs>
        <Box mt={2}>
          {tabValue === 0 && <FindEmailForm />}
          {tabValue === 1 && <FindPasswordForm />}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            onClick={handleClose}
            sx={{
              marginTop: '30px',
            }}
          >
            나가기
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      alert('이메일을 입력해주세요');
      return;
    } else if (!validateEmail(email)) {
      alert('유효한 이메일 주소를 입력하세요.');
      return;
    } else if (!password) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    try {
      const response = await axios.post('api/auth/login', { email, password });
      const { token, roles, nickname, userId, name } = response.data;
      login(token, roles, nickname, 'standard', userId, name);
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
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
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                sx={{
                  color: 'black',
                }}
                onClick={handleClickOpen}
              >
                이메일 / 비밀번호 찾기
              </Button>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <LoginButtons>
                <Link to="/sign-up" style={{ width: '48%' }}>
                  <GenericButton
                    style={{
                      fontSize: '1.1rem',
                      width: '100%',
                      height: '40px',
                    }}
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

          <Divider sx={{ width: '100%' }}>SNS 계정 로그인</Divider>
        </form>

        <SocialIconsContainer>
          <SocialIcon>
            <KakaoLoginButton />
          </SocialIcon>
          <SocialIcon>
            <NaverLoginButton />
          </SocialIcon>
          <SocialIcon>
            <GoogleLoginButton />
          </SocialIcon>
        </SocialIconsContainer>
        <Typography
          variant="body2"
          sx={{ marginBottom: '20px', marginTop: '20px', textAlign: 'center' }}
        >
          <Link
            to="/service"
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
            to="/service"
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
            to="/service"
            style={{
              marginLeft: '10px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            회원정보 고객센터
          </Link>
        </Typography>

        <EmailPasswordModal open={open} handleClose={handleClose} />
      </LoginForm>
    </GoogleOAuthProvider>
  );
};

export default SigninPage;
