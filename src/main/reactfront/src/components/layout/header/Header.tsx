import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MainHeader, Logo, Gnb, Tnb } from './Header.styles';
import { Container } from '@mui/material';
import TopBtn from '../../common/TopBtn';
import AuthContext from '../../../context/AuthContext';
import axios from 'axios';

const Header = () => {
  const { isAuthenticated, userRole, nickname, logout, loginType } =
    useContext(AuthContext);

  const handleLogout = async () => {
    const kakaoAccessToken = localStorage.getItem('kakaoAccessToken');
    try {
      if (loginType === 'kakao' && kakaoAccessToken) {
        await axios.post(
          '/api/auth/kakao/logout',
          {},
          {
            headers: { Authorization: `Bearer ${kakaoAccessToken}` },
          },
        );
        handleKakaoLogout();
        localStorage.removeItem('kakaoAccessToken'); // 카카오 액세스 토큰 제거
      }
      logout();
      alert('로그아웃 되었습니다.');
      window.location.href = '/';
    } catch (error) {
      console.error('로그아웃 실패:', error);
      alert('로그아웃 실패');
    }
  };

  const handleKakaoLogout = () => {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.logout(() => {
        alert('로그아웃 되었습니다.');
        window.location.href = '/';
      });
    }
  };

  return (
    <MainHeader>
      <Container
        maxWidth="lg"
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Logo>
          <Link to="/">FitOn</Link>
        </Logo>
        <Gnb>
          <Link to="/mall">MALL</Link>
          <Link to="/community">COMMUNITY</Link>
          <Link to="/routine">ROUTINE</Link>
          <Link to="/info">INFORMATION</Link>
        </Gnb>
        <Tnb>
          {isAuthenticated ? (
            <>
              {nickname && <li>{nickname}님</li>}
              <li>
                <Link to="/" onClick={handleLogout}>
                  로그아웃
                </Link>
              </li>
              {userRole === 'admin' && (
                <li>
                  <Link to="/administrator">관리자페이지</Link>
                </li>
              )}
              <li>
                <Link to="/mypage">마이페이지</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/sign-in">로그인</Link>
              </li>
              <li>
                <Link to="/sign-up">회원가입</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/shopping-basket">장바구니</Link>
          </li>
        </Tnb>
      </Container>
      <TopBtn />
    </MainHeader>
  );
};

export default Header;
