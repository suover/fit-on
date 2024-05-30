import styled from 'styled-components';

const ProductItem = styled.div`
  width: 250px;
`;

const ItemImgWrapper = styled.div<{ $imgHeight: number }>`
  width: 250px;
  height: ${(props) => props.$imgHeight}px;
  overflow: hidden;
  margin-bottom: 2px;

  &:hover img {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: ${(props) => props.$imgHeight}px;;
    transform: scale(1);
    transition: all 0.4s;
  }
`;

const TextBox = styled.div`
  padding: 3px 3px 0 3px;
  h3 {
    font-weight: bold;
  }

  p:first-of-type {
    font-size: 0.875rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:last-of-type {
    display: flex;
    align-items: end;

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

export { ProductItem, ItemImgWrapper, TextBox };
