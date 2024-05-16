import React from 'react';

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
          <a href="/">FitOn</a>
        </Logo>
        <Gnb>
          <li>MALL</li>
          <li>COMMUNITY</li>
          <li>ROUTINE</li>
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
