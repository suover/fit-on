import React, { useState } from 'react';

import ProductCard from '../../components/productCard/ProductCard';
import { productData, Product } from '../../types/ProductData';

const Products: React.FC = () => {
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(productData);

  return <ProductCard product={filteredProducts} />;
};

export default Products;
