import React from 'react';

import {
  MainFooter,
  FooterLogo,
  InfoList,
  Address,
  ServiceInfo,
} from '../../../styles/layout/Footer';
import { Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <MainFooter>
      <Container sx={{ marginBottom: '10px' }}>
        <FooterLogo>
          <a href="/">FitOn</a>
        </FooterLogo>
      </Container>
      <Container
        sx={{
          fontSize: '0.875rem',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <InfoList>
            <li>회사명 : FitOn</li>
            <li>대표 : 상부삼조</li>
            <li>사업자 등록번호 : 000-00-00000</li>
            <li>통신 판매업신고 : 제 0000-0000호</li>
          </InfoList>
          <Address>주소 : 경기도 경기시 경기동 0000-00</Address>
          <InfoList>
            <li>Tel: 000-0000-0000</li>
            <li>Fax: 000-000-0000</li>
            <li>Email: fiton@test.com</li>
          </InfoList>
        </div>
        <ServiceInfo>
          <p>고객센터 : 000-0000-0000</p>
          <p>상담시간 : 10:00 ~ 17:00</p>
          <p>점심시간 : 12:30 ~ 13:30</p>
          <span>(토, 일, 공휴일 휴무)</span>
        </ServiceInfo>
      </Container>
      <Container
        sx={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}
      >
        <p>&copy;Sangbu3jo all right reserved.</p>
      </Container>
    </MainFooter>
  );
};

export default Footer;
