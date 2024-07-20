import React, { useState } from 'react';

import ProductCard from '../../components/productCard/ProductCard';
import { Product } from '../../types/DataInterface';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Pagination, Stack } from '@mui/material';

interface ProductCardListProps {
  products: Product[];
}

const ProductCardList: React.FC<ProductCardListProps> = ({ products }) => {
  return (
    <>
      <Grid2
        container
        rowSpacing={3}
        // columnSpacing={{ xs: 1, sm: 2, md: 6.3 }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ marginBottom: '30px' }}
      >
        {products.map((product) => (
          <Grid2 key={product.productId} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid2>
        ))}
      </Grid2>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></Stack>
    </>
  );
};

export default ProductCardList;
