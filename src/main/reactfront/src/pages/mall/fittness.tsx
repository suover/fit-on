import React from 'react';
import styled from 'styled-components';
import CardComponent from '../../components/productCard/ProductCard';
import { productData } from '../../types/productData';

const CenteredContainer = styled.div`
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
  }
`;
const Fitness: React.FC = () => {
  const filteredProducts = productData.filter(
    (product) => product.category === '운동용품',
  );

  return (
    <CenteredContainer>
      <CardComponent product={filteredProducts} />
    </CenteredContainer>
  );
};

export default Fitness;
