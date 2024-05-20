import React from 'react';
import PurchasePanel from '../../components/productDetail/PurchasePanel';
import ProductEx from '../../components/productDetail/ProductExplain';
import {
  AppContainer,
  MainContainer,
  TopInfo,
  BottomInfo,
  StyledImageDetail,
} from '../../styles/productDetail/productDetail.styles';

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
