import React from 'react';
import styled from 'styled-components';
import ImageDetail from '../../components/productDetail/ImageDetail';
import PurchasePanel from '../../components/productDetail/PurchasePanel';
import ProductEx from '../../components/productDetail/ProductExplain';

const TopInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 100px;
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
  margin-right: 0;
`;

function ProductDetail() {
  return (
    <>
      <TopInfo>
        <StyledImageDetail />
        <PurchasePanel />
      </TopInfo>
      <BottomInfo>
        <ProductEx />
      </BottomInfo>
    </>
  );
}

export default ProductDetail;
