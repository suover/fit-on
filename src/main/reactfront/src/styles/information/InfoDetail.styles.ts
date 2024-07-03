import styled from 'styled-components';

const InfoWrapper = styled.section`
  width: 100%;
  padding: 100px 0 100px 0;
`;

const NoContentWrapper = styled.section`
  width: 100%;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailTitle = styled.div`
  border-bottom: 1px solid #999;
  padding-bottom: 5px;

  & > span {
    font-size: 0.875rem;

    svg {
      font-size: 0.75rem;
      position: relative;
      top: 1px;
    }
  }

  h2 {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 5px;
  }

  p {
    font-size: 1rem;
    display: flex;
    align-item: center;

    span:nth-of-type(2) {
      margin-left: auto;
      margin-right: 15px;
    }
  }
`;
const Content = styled.div`
  padding-top: 20px;
  text-align: left;
  padding-bottom: 30px;
`;

const ControllBtns = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    width: 80px;
    height: 40px;
    background: transparent;
    border: 1px solid #777;
    border-radius: 3px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background: #333;
      color: #fff;
    }

    &:first-of-type {
      margin-right: 5px;
    }
  }
`;

export { InfoWrapper, NoContentWrapper, DetailTitle, Content, ControllBtns };
