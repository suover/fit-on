import styled from 'styled-components';

const ListItem = styled.li<{ $clicked: boolean }>`
  border-bottom: 1px solid #f1f1f1;

  div:first-of-type > * {
    font-weight: ${(porps) => (porps.$clicked ? 'bold' : 'normal')};
  }
`;

const ListItemDetail = styled.div`
  background: #f5f5f5;
  padding: 20px 85px;

  h3 {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #999;
  }

  p {
    span {
      display: inline-block;
      font-size: 0.75rem;
      width: 40px;
      height: 20px;
      text-align: center;
      background: #999;
      color: #fff;
      margin: 0 7px 0 3px;
      border-radius: 8px;
      position: relative;
      top: -2px;
    }
  }
`;

export { ListItem, ListItemDetail };
