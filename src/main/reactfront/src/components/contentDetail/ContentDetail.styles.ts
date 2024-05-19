import styled from 'styled-components';

const DetailHeading = styled.div`
  width: 100%;
  border-bottom: 1px solid #333;
  padding: 0 3px 10px;

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  div {
    display: flex;

    span:nth-of-type(2) {
      margin-left: auto;
      margin-right: 30px;
    }
  }
`;

const ContentBox = styled.div`
  padding: 20px 3px;
  border-bottom: 1px solid #333;
`;

export { DetailHeading, ContentBox };
