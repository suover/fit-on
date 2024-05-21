import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  PageContainer,
  Divider,
  FormContainer,
  InfoRow,
  PriceRow,
  InputLabel,
  InputInfo,
  LightDivider,
  OrderInfoRow,
  StrongText,
  TotalPriceTxt,
  PaymentMethods,
  Button,
  ButtonContainer,
  Btn,
} from '../../styles/order/Order.Styles';
import { OrderDetails, Product } from '../../types/orderInterface';
import OrderInformation from '../../components/order/OrderInfoProps';
import RadioButtonsGroup from '../../components/order/Radio';
import SelectCard from '../../components/order/SelectCard';
import image05 from '../../assets/img/image05.jpg';

const OrderPage: React.FC = () => {
  const location = useLocation();
  const { selectedProduct } = location.state || {};
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerName: '',
    phoneNumber: '',
    address: '',
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string>('hd');
  const [totalPrice, setTotalPrice] = useState<number>(0); // 초기 값 0으로 설정
  const [paymentType, setPaymentType] = useState<string>('card');

  useEffect(() => {
    if (selectedProduct) {
      setProducts([selectedProduct]);
      setTotalPrice(selectedProduct.price * selectedProduct.quantity);
      console.log('선택된 옵션:', selectedProduct?.selection);
    }
  }, [selectedProduct]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDetails({
      ...orderDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Order Details:', orderDetails);
    console.log('Products:', products);
    console.log('Payment Method:', paymentMethod);
    alert('주문서가 제출되었습니다.');
  };

  // products 배열이 변경될 때마다 totalPrice를 업데이트
  useEffect(() => {
    const newTotal = products.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);
    setTotalPrice(newTotal);
  }, [products]); // products 배열이 변경되면 이 코드가 실행됨

  return (
    <PageContainer>
      <h1>주문서 작성</h1>
      <Divider />
      <h2>배송 정보</h2>
      <FormContainer onSubmit={handleSubmit}>
        <InfoRow>
          <InputLabel htmlFor="customerName">받으실 분</InputLabel>
          <InputInfo
            id="customerName"
            name="customerName"
            value={orderDetails.customerName}
            onChange={handleInputChange}
            placeholder="수령인 성함 (예: 홍길동)"
          />
        </InfoRow>
        <InfoRow>
          <InputLabel htmlFor="phoneNumber">연락처</InputLabel>
          <InputInfo
            id="phoneNumber"
            name="phoneNumber"
            value={orderDetails.phoneNumber}
            onChange={handleInputChange}
            placeholder="연락처 (예: 01012345678)"
          />
        </InfoRow>
        <InfoRow>
          <InputLabel htmlFor="address">배송지 주소</InputLabel>
          <InputInfo
            id="address"
            name="address"
            value={orderDetails.address}
            onChange={handleInputChange}
            placeholder="우편번호 검색을 클릭하여 정확한 주소를 입력해주세요."
          />
          <Btn type="submit">우편번호 검색</Btn>
        </InfoRow>
        <LightDivider />
        <h2>결제 상품 정보</h2>
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center', // 세로 중앙 정렬
              marginBottom: '10px',
            }}
          >
            <OrderInformation src={image05} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <OrderInfoRow key={index}>
                <div>{product.name}</div>
                <div>{product.quantity}개</div>
                <div>{selectedProduct.selection}</div>
                <div>
                  {(product.price * product.quantity).toLocaleString()}원
                </div>
              </OrderInfoRow>
            </div>
          </div>
        ))}
        <PriceRow>
          <StrongText>총 결제 금액</StrongText>
          <TotalPriceTxt>{totalPrice.toLocaleString()}원</TotalPriceTxt>
        </PriceRow>
        <LightDivider />
        <h2>결제 수단</h2>
        <PaymentMethods>
          <RadioButtonsGroup
            paymentType={paymentType}
            setPaymentType={setPaymentType}
          />
          {paymentType === 'card' && (
            <SelectCard
              paymentMethod={paymentMethod}
              handleSelectChange={handleSelectChange}
            />
          )}
        </PaymentMethods>
        <ButtonContainer>
          <Button type="submit">결제하기</Button>
        </ButtonContainer>
      </FormContainer>
    </PageContainer>
  );
};

export default OrderPage;
