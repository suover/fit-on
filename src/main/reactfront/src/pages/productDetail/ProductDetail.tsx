import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import { Product } from '../../types/DataInterface';
import {Container, Typography} from '@mui/material';
import styled from 'styled-components';
import SideNavbar from '../../components/layout/sideNavBar/SideNavbar';
import ImageDetail from '../../components/productDetail/ImageDetail';
import PurchasePanel from '../../components/productDetail/PurchasePanel';
import ProductExplain from '../../components/productDetail/ProductExplain';
import axios from "axios";

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
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (location.state && location.state.product) {
          setProduct(location.state.product);
        } else if (productId !== undefined) {
          const id = parseInt(productId, 10);
          if (!isNaN(id)) {
            const response = await axios.get<Product>(`/api/products/${id}/detail`);
            setProduct(response.data);
          } else {
            console.error('Invalid product ID:', productId);
          }
        } else {
          console.error('Product ID is undefined');
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [productId, location.state]);

  
  // 데이터가 없는 경우 (에러 처리 등)
  if (!product) {
    return (
        <Container
            maxWidth="lg"
            sx={{
              minHeight: '700px',
              padding: '50px 0 100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >
          <Typography variant="h6">상품이 존재하지 않습니다.</Typography>
        </Container>
    );
  }

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
