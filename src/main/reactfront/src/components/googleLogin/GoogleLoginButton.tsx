import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);

  const handleLoginSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      try {
        const res = await axios.post('http://localhost:8080/api/auth/google', {
          token: response.credential,
        });
        if (res.status === 200) {
          const { token, roles, nickname } = res.data;
          login(token, roles, nickname, 'google');
          alert('Google 계정으로 로그인 하였습니다.');
          navigate('/');
        }
      } catch (error) {
        console.error('Google 로그인 실패', error);
        alert('Google 로그인에 실패했습니다.');
      }
    } else {
      console.error('No credential received');
      alert('Google 로그인에 실패했습니다.');
    }
  };

  const handleLoginFailure = () => {
    console.error('Google 로그인 실패');
    alert('Google 로그인에 실패했습니다.');
  };

  return (
    <GoogleLogin
      onSuccess={handleLoginSuccess}
      onError={handleLoginFailure}
      type="icon"
      size="large"
    />
  );
};

export default GoogleLoginButton;
