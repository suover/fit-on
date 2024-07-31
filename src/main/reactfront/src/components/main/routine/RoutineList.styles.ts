import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 5px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  &:hover img {
    transform: scale(1.02);
  }
`;

const RoutineImgCard = styled.div`
  width: 350px;
  height: 300px;
  overflow: hidden;
  background: #f2f2f2;

  img {
    width: 100%;
    height: auto;
    transform: scale(1);
    transition: all 0.4s;
  }
`;

const TextBox = styled.div`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      width: 250px;
      font-size: 1.125rem;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    svg {
      color: crimson;
      position: relative;
      top: 4px;
      margin-right: 3px;
    }
  }

  p:last-of-type {
    font-size: 0.875rem;
    color: #999;
  }
`;

export { CardWrapper, RoutineImgCard, TextBox };
