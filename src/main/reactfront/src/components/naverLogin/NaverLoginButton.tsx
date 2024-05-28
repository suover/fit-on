import React from 'react';
import naverLoginImage from '../../assets/img/signin/naver.png';

const NaverLoginButton: React.FC = () => {
  const handleClick = () => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      process.env.REACT_APP_NAVER_CALLBACK_URL!,
    );
    const state = Math.random().toString(36).substring(2);
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = naverAuthUrl;
  };

  return (
    <div>
      <img
        src={naverLoginImage}
        alt="Naver Login"
        onClick={handleClick}
        style={{ cursor: 'pointer', width: '38px' }}
      />
    </div>
  );
};

export default NaverLoginButton;
