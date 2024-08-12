import styled from 'styled-components';

const StyledTable = styled.ul`
  border-top: 1px solid #888;
  border-bottom: 1px solid #888;
  margin-bottom: 50px;

  & > li {
    background: #f1f1f1;
    pointer-events: none;
  }

  li {
    height: 50px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f3f3f3;
    padding: 0px 20px;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
      background: #f8f8f8;
      font-weight: bold;
    }
  }
`;

export default StyledTable;
