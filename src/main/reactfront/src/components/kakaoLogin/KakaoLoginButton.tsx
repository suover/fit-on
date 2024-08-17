import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import kakaoLoginImage from '../../assets/img/signin/kakao.png';

const KakaoLoginButton: React.FC = () => {
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY!);
    }
  }, []);

  const handleLoginSuccess = async (response: any) => {
    try {
      const res = await axios.post('/api/auth/kakao', {
        kakaoAccessToken: response.access_token,
      });
      if (res.status === 200) {
        const { accessToken } = res.data;
        login(accessToken, 'kakao');
        alert('Kakao 계정으로 로그인 하였습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('Kakao 로그인 실패', error);
      alert('Kakao 로그인에 실패했습니다.');
    }
  };

  const handleClick = () => {
    window.Kakao.Auth.login({
      success: handleLoginSuccess,
      fail: (error: any) => {
        console.error('Kakao 로그인 실패', error);
        alert('Kakao 로그인에 실패했습니다.');
      },
    });
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img alt="KakaoTalk" width={40} src={kakaoLoginImage} />
    </div>
  );
};

export default KakaoLoginButton;
