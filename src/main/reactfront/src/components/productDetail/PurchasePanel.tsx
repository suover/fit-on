import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import QuantityInput from './QuantityInput';
import UnstyledSelectForm from './UnstyledSelectForm';
import BasicRating from './BasicRating';
import { PurchasePanelBtn } from './PurchasePanelBtn';
import { Snackbar, Alert } from '@mui/material';

import { Product } from '../../types/DataInterface';
import axios from 'axios';
import {
  StyledProductDetail,
  TopContainer,
  StyledRating,
  InfoContainer,
  ShippingContainer,
  Btns,
} from './PurchasePanel.styles';

interface PurchasePanelProps {
  product: Product;
}

const PurchasePanel: React.FC<PurchasePanelProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selection, setSelection] = useState('10');
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false); // 장바구니 추가 알림 상태
  const navigate = useNavigate();

  //해야할 것 : product id 기반 리뷰 불러오기.
  // 장바구니 : 누를시 상품 수량에 맞춰 카트로 이동시키기.

  useEffect(() => {
    setTotalPrice(product.price * quantity);
  }, [quantity, product.price]);

  // 선택 변경 핸들러
  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelection(event.target.value);
  };

  //장바구니 상품 추가
  const handleCartClick = async () => {
    const userId = 36; // 관리자 userid
    try {
      const response = await axios.post('/api/carts/add', {
        userId,
        productId: product.productId,
        quantity,
      });
      if (response.status === 200) {
        setOpen(true); //장 바구니 추가 성공시 알람
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };

  //장바구니에 추가 + 장바구니로 이동
  const handlePurchaseClick = async () => {
    const userId = 36; // 관리자 userid
    try {
      const response = await axios.post('/api/carts/add', {
        userId,
        productId: product.productId,
        quantity,
      });
      if (response.status === 200) {
        navigate('/shopping-basket');
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <StyledProductDetail>
      <TopContainer>
        <div className="productHeading">
          <h2>{product.name}</h2>
          <div>
            <Button variant="outlined" size="small">
              BEST
            </Button>
            <Button variant="outlined" color="error" size="small">
              SALE
            </Button>
          </div>
        </div>
        <p className="description">{product.name}</p>
        <StyledRating>
          <BasicRating />
          <p>&#40;32 reviews&#41;</p>
        </StyledRating>
        <p className="price">{product.price.toLocaleString()}원</p>
      </TopContainer>

      <InfoContainer>
        <p>수량</p>
        <QuantityInput quantity={quantity} setQuantity={setQuantity} />
      </InfoContainer>
      <InfoContainer>
        <p style={{ marginBottom: '8px' }}>선택</p>
        <UnstyledSelectForm
          value={selection}
          onChange={handleSelectionChange}
        />
      </InfoContainer>
      <InfoContainer>
        <p>배송비</p>
        <p>무료배송</p>
      </InfoContainer>
      <ShippingContainer>
        <p>구매 예정 금액</p>
        <p className="totalPrice">{totalPrice.toLocaleString()}원</p>
      </ShippingContainer>
      <Btns>
        <PurchasePanelBtn
          onClick={handleCartClick}
          label="장바구니"
          bgColor="rgb(255, 171, 0)"
        />
        <PurchasePanelBtn
          onClick={handlePurchaseClick}
          label="구매하기"
          bgColor="rgb(33, 43, 54)"
        />
      </Btns>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          상품이 장바구니에 추가되었습니다!
        </Alert>
      </Snackbar>
    </StyledProductDetail>
  );
};

export default PurchasePanel;
