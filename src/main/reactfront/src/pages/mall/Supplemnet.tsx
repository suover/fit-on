import React from 'react';

import CardComponent from '../../components/productCard/ProductCard';
import { productData } from '../../types/ProductData';

const Supplement: React.FC = () => {
  const filteredProducts = productData.filter(
    (product) => product.category === '보충제',
  );

  return <CardComponent product={filteredProducts} />;
};

export default Supplement;
