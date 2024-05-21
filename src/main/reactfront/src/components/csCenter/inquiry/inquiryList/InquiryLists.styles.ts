import styled from 'styled-components';

const InquiryTable = styled.ul`
  border-top: 1px solid #888;
  border-bottom: 1px solid #888;
  margin-bottom: 50px;

  li {
    &:first-of-type {
      background: #f1f1f1;
      text-align: center;
    }
    div:first-of-type {
      height: auto;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      cursor: pointer;
      box-sizing: border-box;

      p {
        flex: 1;
      }

      span {
        text-align: center;
      }

      span:nth-of-type(1) {
        width: 30px;
        margin-right: 30px;
      }

      span:nth-of-type(2),
      span:nth-of-type(3) {
        width: 70px;
        margin-right: 50px;
      }

      span:nth-of-type(4) {
        width: 150px;
        margin-right: 30px;
      }

      span:nth-of-type(5) {
        width: 100px;
      }
    }
  }
`;

export default InquiryTable;
