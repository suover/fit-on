import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Cards,
  Card,
  CardInfoHover,
  CardInfo,
  CardText,
  CardLike,
} from './ProductCard.styles';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import { Product } from '../../types/DataInterface';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 1200,
};

interface CardComponentProps {
  product: Product;
}

const ProductCard: React.FC<CardComponentProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleItemClick = (product: Product) => {
    navigate(`/product-detail/${product.productId}`, {
      state: { product },
    });
  };

  return (
    <>
      <Card onClick={() => handleItemClick(product)} bgImage={product.imageUrl}>
        <CardInfoHover>
          <CardLike viewBox="0 0 24 24">
            <path
              fill="#000000"
              d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z"
            />
          </CardLike>
        </CardInfoHover>
        <div className="card__img"></div>
        <CardInfo>
          <CardText>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>
              <span>{product.discountRate || 0}% 할인</span>
              <span>{product.price.toLocaleString()}원</span>
              {/* <span>{product.sales || 0} 판매</span> */}
            </p>
          </CardText>
        </CardInfo>
      </Card>
    </>
  );
};

export default ProductCard;
