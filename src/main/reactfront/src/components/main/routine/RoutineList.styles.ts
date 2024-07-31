import styled from 'styled-components';

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:hover img {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: all 0.4s;
  }
`;

const RoutineImgCard = styled.div`
  width: 350px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  background: #f2f2f2;
`;

const TextBox = styled.div`
  width: 100%;
  padding: 5px 5px 0 5px;
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
    span {
      display: flex;
      align-items: center;
      gap: 3px;

      svg:nth-of-type(1) {
        color: crimson;
      }
    }
  }

  p:last-of-type {
    font-size: 0.875rem;
  }
`;

export { CardWrapper, RoutineImgCard, TextBox };
