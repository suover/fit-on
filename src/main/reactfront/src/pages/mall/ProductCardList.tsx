import React, { useState } from 'react';

import ProductCard from '../../components/productCard/ProductCard';
import { Product, ProductImage } from '../../types/DataInterface';
import Grid from '@mui/material/Grid';
import {
  Cards,
  Card,
  CardInfoHover,
  CardInfo,
  CardText,
  CardLike,
} from '../../components/productCard/ProductCard.styles';
import { Pagination, Stack } from '@mui/material';

interface ProductCardListProps {
  products: Product[];
}

const ProductCardList: React.FC<ProductCardListProps> = ({ products }) => {
  return (
    <>
      <Grid
        container
        spacing={3}
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Cards>
          {products.map((product) => (
            <Grid item key={product.productId} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Cards>
      </Grid>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination count={5} variant="outlined" />
      </Stack>
    </>
  );
};

export default ProductCardList;
