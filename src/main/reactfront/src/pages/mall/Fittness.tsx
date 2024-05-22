import React from 'react';
import CardComponent from '../../components/productCard/ProductCard';
import { productData } from '../../types/ProductData';

const Fitness: React.FC = () => {
  const filteredProducts = productData.filter(
    (product) => product.category === '운동용품',
  );

  return <CardComponent product={filteredProducts} />;
};

export default Fitness;
