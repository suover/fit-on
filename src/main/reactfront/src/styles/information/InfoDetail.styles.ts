import styled from 'styled-components';

const InfoWrapper = styled.section`
  width: 100%;
  min-height: 600px;
  padding: 100px 0 100px 0;
`;

const StateWrapper = styled.section`
  width: 100%;
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-weight: bold;
    margin-bottom: 8px;
  }

  a {
    font-size: 0.875rem;
    color: #777;
    text-decoration: underline;
  }
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
  }

  & > div {
    font-size: 1rem;
    display: flex;
    align-items: center;
    margin-bottom: 3px;

    div {
      margin-right: 8px;
    }

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
  gap: 5px;

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
  }
`;

export { InfoWrapper, StateWrapper, DetailTitle, Content, ControllBtns };
