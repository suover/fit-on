import styled from 'styled-components';

const Card = styled.div`
  width: 250px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 30px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.1);
  transform: scale(1);
  transition: all 0.4s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 2px 2px 5px 6px rgba(0, 0, 0, 0.1);
  }

  div:first-of-type {
    width: 250px;
    height: 250px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: auto;
    }
  }
`;

const TextBox = styled.div`
  padding: 6px;
  box-sizing: border-box;

  h3 {
    width: 100%;
    height: 50px;
    font-weight: bold;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 3px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  p {
    display: flex;
    align-items: center;

    span {
      font-size: 0.875rem;
    }

    span:nth-of-type(2) {
      margin-left: auto;
      margin-right: 15px;
    }

    svg {
      font-size: 0.875rem;
      position: relative;
      top: 2px;
    }
  }
`;

export { Card, TextBox };
