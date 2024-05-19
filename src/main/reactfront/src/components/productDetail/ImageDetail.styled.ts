import styled from 'styled-components';

export const ProImg = styled.div`
  margin-right: 40px;
`;
export const MainImg = styled.div`
  width: 440px;
  height: 320px;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    box-shadow: 0px 8px 8px -8px rgba(0, 0, 0, 0.1);
    transform: scale(1.02, 1.02);
  }
`;
export const DetailImg = styled.div`
  width: 440px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  .productImage {
    border-radius: 10px;
    object-fit: cover;
    object-position: center center;
    transition: border 1.5s ease;
    &:hover {
      border: 1px solid black;
    }
  }
`;
export const ImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  img {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
  }
`;

export const MainWrapper = styled.div<{ $imgHeight: number }>`
  width: 250px;
  height: ${(props) => props.$imgHeight}px;
  overflow: hidden;
  margin-bottom: 2px;

  &:hover img {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: auto;
    transform: scale(1);
    transition: all 0.4s;
  }
`;
