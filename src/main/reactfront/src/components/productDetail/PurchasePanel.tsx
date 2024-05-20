import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import QuantityInput from './QuantityInput';
import UnstyledSelectForm from './UnstyledSelectForm';
import { SelectChangeEvent } from '@mui/material/Select';
import BasicRating from './BasicRating';
import { PurchasePanelBtn } from './PurchasePanelBtn';
import { productData } from '../../types/productData';
import {
  StyledProductDetail,
  TopContainer,
  StyledRating,
  NameContainer,
  ButtonContainer,
  ExplainContainer,
  Divider,
  PriceContainer,
  QuantityContainer,
  SelectContainer,
  ShippingContainer,
  Btns,
  NoticePrice,
  TotalPrice,
} from './PurchasePanel.styles';

const PurchasePanel = () => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
  });
  const [quantity, setQuantity] = useState(1);
  const [selection, setSelection] = useState('블랙');
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

  const handleSelectionChange = (event: SelectChangeEvent<string>) => {
    setSelection(event.target.value as string);
  };

  //장바구니 이동
  function handleCartClick() {
    navigate('/cart-page'); //현재 페이지가 만들어지지 않아 임시경로 삽입
  }
  //주문페이지 이동
  function handlePurchaseClick() {
    navigate('/order-page', {
      state: {
        selectedProduct: {
          name: product.name,
          price: product.price,
          quantity: quantity,
          selection: selection,
          totalPrice: totalPrice,
        },
      },
    });
  }

  return (
    <StyledProductDetail>
      <TopContainer>
        <NameContainer>{product.name}</NameContainer>
        <ButtonContainer>
          <Button variant="outlined" size="small">
            BEST
          </Button>
          <Button variant="outlined" color="error" size="small">
            SALE
          </Button>
        </ButtonContainer>
      </TopContainer>
      <ExplainContainer>
        <p>강도 조절 무소음 악력기</p>
      </ExplainContainer>
      <StyledRating>
        <BasicRating />
        <p>(32 reviews)</p>
      </StyledRating>
      <PriceContainer>
        <p>{product.price.toLocaleString()}원</p>
      </PriceContainer>

      <Divider />

      <QuantityContainer>
        <p>수량</p>
        <QuantityInput quantity={quantity} setQuantity={setQuantity} />
      </QuantityContainer>
      <SelectContainer>
        <p>선택</p>
        <UnstyledSelectForm
          value={selection} // 선택 상태 전달
          onChange={handleSelectionChange} // 변경 이벤트 핸들러 전달
        />
      </SelectContainer>
      <ShippingContainer>
        <p>배송비</p>
        <p>무료배송</p>
      </ShippingContainer>
      <ShippingContainer>
        <NoticePrice>구매 예정 금액</NoticePrice>
        <TotalPrice>{totalPrice.toLocaleString()}원</TotalPrice>
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
