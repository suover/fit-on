import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MainHeader, Logo, Gnb, Tnb } from './Header.styles';
import { Container } from '@mui/material';
import TopBtn from '../../common/TopBtn';
import AuthContext from '../../../context/AuthContext';

const Header = () => {
  const { isAuthenticated, userRole, nickname, logout } =
    useContext(AuthContext);

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
                <Link to="/" onClick={logout}>
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
          <li>장바구니</li>
        </Tnb>
      </Container>
      <TopBtn />
    </MainHeader>
  );
};

export default Header;
