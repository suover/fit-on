import React from 'react';
import { Link } from 'react-router-dom';

import { MainHeader, Logo, Gnb, Tnb } from './Header.styles';
import { Container } from '@mui/material';
import TopBtn from '../../common/TopBtn';

const Header = () => {
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
          <Link to="mall">MALL</Link>
          <Link to="community">COMMUNITY</Link>
          <Link to="routine">ROUTINE</Link>
          <Link to="info">INFORMATION</Link>
        </Gnb>
        <Tnb>
          <li>
            <Link to="sign-in">로그인</Link>
          </li>
          <li>
            <Link to="sign-up">회원가입</Link>
          </li>
          <li>장바구니</li>
        </Tnb>
      </Container>
      <TopBtn />
    </MainHeader>
  );
};

export default Header;
