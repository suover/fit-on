import styled from 'styled-components';

const ListItem = styled.li<{ $clicked: boolean }>`
  border-bottom: 1px solid #999;
  cursor: pointer;

  &:last-of-type {
    border-bottom: 0;
  }

  h4,
  p {
    padding: 15px 15px;
  }
  h4 {
    font-weight: ${(props) => (props.$clicked ? 'bold' : 'normal')};
    display: flex;
    align-items: center;

    span:first-of-type {
      margin-right: 40px;
      font-weight: bold;
      color: #999;
    }

    span:last-of-type {
      margin-left: auto;
      position: relative;
      top: ${(props) => (props.$clicked ? 0 : '4px')};
      transform: ${(props) => (props.$clicked ? 'rotate(180deg)' : '')};
    }
  }

  p {
    height: ${(props) => (props.$clicked ? 'auto' : 0)};
    display: ${(props) => (props.$clicked ? 'block' : 'none')};
    padding-left: 75px;
    border-top: 1px solid #999;
    background: #f2f2f2;
  }
`;

export default ListItem;
