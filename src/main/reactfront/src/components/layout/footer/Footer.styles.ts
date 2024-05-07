import styled from 'styled-components';

const MainFooter = styled.footer`
  width: 100%;
  background: #111;
  padding-top: 10px;
  padding-bottom: 10px;
  color: #fff;
`;

const FooterLogo = styled.h3`
  a {
    color: #fff;
    font-size: 1.875rem;
    font-weight: bold;
  }
`;

const InfoList = styled.ul`
  display: flex;
  align-item: center;
  margin-bottom: 8px;

  li {
    margin-right: 20px;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Address = styled.address`
  margin-bottom: 8px;
`;

const ServiceInfo = styled.div`
  text-align: right;

  p {
    font-size: 0.875rem;

    &:first-of-type {
      font-size: 1rem;
      margin-bottom: 8px;
    }
  }

  span {
    font-size: 0.75rem;
  }
`;

export { MainFooter, FooterLogo, InfoList, Address, ServiceInfo };
