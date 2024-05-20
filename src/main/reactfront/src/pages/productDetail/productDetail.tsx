import React from 'react';
import styled from 'styled-components';
import ImageDetail from '../../components/productDetail/ImageDetail';
import PurchasePanel from '../../components/productDetail/PurchasePanel';
import ProductEx from '../../components/productDetail/ProductExplain';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: center;
  height: 60vh;
  width: 100%;
  margin-top: 20px;
`;
const BottomInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box; /* 패딩과 보더를 너비 계산에 포함 */
`;
const StyledImageDetail = styled(ImageDetail)`
  margin-right: px;
`;

function ProductDetail() {
  return (
    <>
      <AppContainer>
        <MainContainer>
          <TopInfo>
            <StyledImageDetail />
            <PurchasePanel />
          </TopInfo>
          <BottomInfo>
            <ProductEx />
          </BottomInfo>
        </MainContainer>
      </AppContainer>
    </>
  );
}

export default ProductDetail;
