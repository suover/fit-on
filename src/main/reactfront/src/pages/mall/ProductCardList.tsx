import React from 'react';
import ProductCard from '../../components/productCard/ProductCard';
import { Product } from '../../types/DataInterface';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Stack } from '@mui/material';

interface ProductCardListProps {
    products: Product[];
}

const ProductCardList: React.FC<ProductCardListProps> = ({ products }) => {
    return (
        <>
            <Grid2
                container
                rowSpacing={3}
                columnSpacing={{ xs: 2, sm: 2, md: 3 }} // 동일한 간격 유지
                sx={{ marginBottom: '30px', justifyContent: 'center' }}
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
