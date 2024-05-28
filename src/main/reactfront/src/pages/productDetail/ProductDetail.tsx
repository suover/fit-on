import React from 'react';
import { useLocation } from 'react-router-dom';
import { Product } from '../../types/DataInterface';
import { Container } from '@mui/material';
import styled from 'styled-components';
import SideNavbar from '../../components/layout/sideNavBar/SideNavbar';
import ImageDetail from '../../components/productDetail/ImageDetail';
import PurchasePanel from '../../components/productDetail/PurchasePanel';
import ProductExplain from '../../components/productDetail/ProductExplain';

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
  const location = useLocation();
  const product: Product = location.state.product;

  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
        <TopInfo>
          <StyledImageDetail product={product} />
          <PurchasePanel product={product} />
        </TopInfo>
        <BottomInfo>
          <ProductExplain product={product} />
        </BottomInfo>
      </Container>
    </>
  );
}

export default ProductDetail;
