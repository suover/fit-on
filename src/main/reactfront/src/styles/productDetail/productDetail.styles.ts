import styled from 'styled-components';
import ImageDetail from '../../components/productDetail/ImageDetail';

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TopInfo = styled.div`
  display: flex;
  justify-content: center;
  height: 60vh;
  width: 100%;
  margin-top: 20px;
`;

export const BottomInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box; /* 패딩과 보더를 너비 계산에 포함 */
`;

export const StyledImageDetail = styled(ImageDetail)`
  margin-right: 0px; // Adjust 'px' value as needed
`;
