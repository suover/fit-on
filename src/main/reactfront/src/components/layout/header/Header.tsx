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
          <li>INFORMATION</li>
        </Gnb>
        <Tnb>
          <li>로그인</li>
          <li>회원가입</li>
          <li>장바구니</li>
        </Tnb>
      </Container>
      <TopBtn />
    </MainHeader>
  );
};

export default Header;
