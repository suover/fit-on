import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import QuantityInput from './QuantityInput';
import UnstyledSelectForm from './UnstyledSelectForm';
import BasicRating from './BasicRating';
import { PurchasePanelBtn } from './PurchasePanelBtn';
import { productData } from '../../types/ProductData';
import {
  StyledProductDetail,
  TopContainer,
  StyledRating,
  InfoContainer,
  ShippingContainer,
  Btns,
} from './PurchasePanel.styles';

const PurchasePanel = () => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
  });
  const [quantity, setQuantity] = useState(1);
  const [selection, setSelection] = useState('10');
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    //데이터 로드
    const productInfo = productData.find((p) => p.id === 1); // id가 '1'인 제품 찾기
    if (productInfo) {
      setProduct({ name: productInfo.name, price: productInfo.price });
      setTotalPrice(productInfo.price); // 초기 totalPrice 설정
    }
  }, []);

  useEffect(() => {
    setTotalPrice(product.price * quantity);
  }, [quantity, product.price]);

  // 선택 변경 핸들러
  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelection(event.target.value);
  };

  //장바구니 이동
  function handleCartClick() {
    navigate('/shopping-basket');
  }
  //주문페이지 이동
  function handlePurchaseClick() {
    navigate('/order-page');
  }

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
        <p className="description">강도 조절 무소음 악력기</p>
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
          value={selection} // 선택 상태 전달
          onChange={handleSelectionChange} // 변경 이벤트 핸들러 전달
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
    </StyledProductDetail>
  );
};

export default PurchasePanel;
