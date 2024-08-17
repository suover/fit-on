import styled from 'styled-components';

// 기본적인 카드 컨테이너 스타일
export const Cards = styled.section`
  width: 100%;
    //min-width: 250px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

// 각 카드 스타일
export const Card = styled.article<{ bgImage: string }>`
  background-color: #fff;
  width: 250px; // 베스트 아이템과 동일한 너비로 설정
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0, 1);
  cursor: pointer;
  margin: 0 15px 30px 15px; // 좌우 간격 추가, 아래쪽 간격 추가

  &:hover {
    box-shadow: 2px 2px 18px 2px rgba(0, 0, 0, 0.1);
    transform: scale(1.02, 1.02);
  }
  
  .card__img,
  .card__img--hover {
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    height: 235px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .card__img {
    opacity: 1;
    visibility: visible;
  }
`;

export const CardInfoHover = styled.div`
  position: absolute;
  width: 100%;
  opacity: 0;
  top: 0;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

export const CardInfo = styled.div`
  background-color: #ffff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  padding: 22px;
  z-index: 2;
`;

export const CardText = styled.div`
  h3 {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:first-of-type {
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:last-of-type {
    align-items: end;
    display: flex;

    span:first-of-type {
      color: crimson;
      margin-right: 5px;
    }

    span:last-of-type {
      font-size: 0.75rem;
      margin-left: auto;
    }
  }
`;

export const CardLike = styled.svg`
  width: 18px;
`;
