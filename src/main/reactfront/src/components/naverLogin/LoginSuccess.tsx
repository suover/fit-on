import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const LoginSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');

    if (accessToken) {
      login(accessToken, 'naver');
      alert('Naver 계정으로 로그인 하였습니다.');
      navigate('/');
    } else {
      console.error('로그인 정보를 가져오는 데 실패했습니다.');
      alert('Naver 로그인에 실패했습니다.');
      navigate('/login');
    }
  }, [navigate, login]);

  return null;
};

export default LoginSuccess;
