import styled from 'styled-components';

const InfoWrapper = styled.section`
  width: 100%;
  padding: 100px 0 100px 0;
`;

const DetailTitle = styled.div`
  border-bottom: 1px solid #555;
  padding-bottom: 5px;

  h2 {
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 5px;
  }

  p {
    font-size: 0.875rem;
    display: flex;
    align-item: center;
  }

  span:nth-of-type(2) {
    margin-left: auto;
    margin-right: 15px;
  }
`;
const Content = styled.div`
  padding-top: 20px;
  text-align: left;
  border-bottom: 1px solid #555;
  padding-bottom: 20px;
`;

export { InfoWrapper, DetailTitle, Content };
