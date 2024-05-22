import React from 'react';

import ProductCard from '../../components/productCard/ProductCard';
import { productData } from '../../types/ProductData';

const Food: React.FC = () => {
  const filteredProducts = productData.filter(
    (product) => product.category === '식품',
  );

  return <ProductCard product={filteredProducts} />;
};

export default Food;
