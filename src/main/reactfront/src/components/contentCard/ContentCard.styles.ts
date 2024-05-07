import styled from 'styled-components';

const Card = styled.div`
  width: 250px;

  &:hover img {
    transform: scale(1.05);
  }

  img {
    transform: scale(1);
    transition: all 0.4s;
  }

  div:first-of-type {
    width: 250px;
    height: 250px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
  }
`;

const TextBox = styled.div`
  padding: 3px 5px 0 5px;
  box-sizing: border-box;

  h3 {
    width: 100%;
    max-height: 50px;
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
