import React from 'react';
import styled from 'styled-components';
import ProductCard from '../../components/productCard/ProductCard';
import { productData } from '../../types/productData';

const CenteredContainer = styled.div`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const Food: React.FC = () => {
  const filteredProducts = productData.filter(
    (product) => product.category === '식품',
  );

  return (
    <CenteredContainer>
      <ProductCard product={filteredProducts} />
    </CenteredContainer>
  );
};

export default Food;
