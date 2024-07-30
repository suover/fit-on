import React from 'react';
import { Link } from 'react-router-dom';

import { ProductItem, ItemImgWrapper, TextBox } from './ProductItem.styles';

interface Product {
  productId: number;
  name: string;
  price: number;
  discountRate?: number;
  description: string;
  sales?: number;
  likes?: number;
  imageUrl: string;
  stock?: number;
}

interface ItemProps {
  product: Product;
  $imgHeight: number;
}

const Item: React.FC<ItemProps> = ({ product, $imgHeight }) => {
  const { productId, name, price, discountRate, description, imageUrl, stock } =
    product;

  const priceFormat: string = price.toLocaleString('ko-KR');

  return (
    <ProductItem>
      <Link to={`/product-detail/${productId}`}>
        <ItemImgWrapper $imgHeight={$imgHeight}>
          <img src={imageUrl} alt="상품이미지" />
        </ItemImgWrapper>
        <TextBox>
          <h3>{name}</h3>
          <p>{description}</p>
          <p>
            <span>{discountRate}%</span>
            <span>{priceFormat}원</span>
            <span>재고 {stock}개</span>
          </p>
        </TextBox>
      </Link>
    </ProductItem>
  );
};

export default Item;
