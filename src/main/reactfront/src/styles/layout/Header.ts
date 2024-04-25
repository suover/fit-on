import styled from 'styled-components';

const MainHeader = styled.header`
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #e0e1dd;
`;

const Logo = styled.h1`
  margin-right: 50px;
  a {
    display: block;
    width: 110px;
    height: 80px;
    line-height: 80px;
    font-size: 2.5rem;
    font-weight: bold;
  }
`;

const Gnb = styled.ul`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.125rem;
`;

const Tnb = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  font-weight: bold;

  li {
    margin-right: 8px;

    &:not(:last-of-type)::after {
      content: '|';
      font-size: 0.825rem;
      padding-left: 8px;
      position: relative;
      top: -1px;
    }

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

export { MainHeader, Logo, Gnb, Tnb };
