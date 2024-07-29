import React, {useState, useEffect, useContext} from 'react';
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
import { OrderDetails, Product, ShippingAddress } from '../../types/DataInterface';
import OrderInformation from '../../components/order/OrderInfoProps';
import RadioButtonsGroup from '../../components/order/Radio';
import SelectCard from '../../components/order/SelectCard';
import axios from '../../api/axiosConfig';
import AuthContext from "../../context/AuthContext";
import DaumPostcode from 'react-daum-postcode'; //npm install react-daum-postcode
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const OrderPage: React.FC = () => {
  const location = useLocation();
  const { selectedProducts }: { selectedProducts?: Product[] } =
    location.state || {};
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    customerName: '',
    phoneNumber: '',
    postcode:'',
    add1: '',
    add2:'',
  });
  const [isOpen, setIsOpen] = useState<boolean>(false); //주소Modal

  const [products, setProducts] = useState<Product[]>([]);

  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState<number>(0);

  const [paymentMethod, setPaymentMethod] = useState<string>('hd');
  const [paymentType, setPaymentType] = useState<string>('card');

  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  // AuthContext 에서 유저 아이디 및 이름 받아오기
  const { userId, name } = useContext(AuthContext);

  // 사용자 기본 설정 배송지 정보 가져오기
  const fetchUserDefaultAddress = async (userId: number) => {
    try {
      const response = await axios.get(`/api/shipadd/${userId}/default`);
      if (response.status === 200 && response.data) {
        const defaultAddress = response.data;
        setOrderDetails({
          customerName: defaultAddress.recipientName,
          phoneNumber: defaultAddress.contact,
          postcode: defaultAddress.postcode,
          add1: defaultAddress.address,
          add2: defaultAddress.addressDetail,
        });
      } else {
        console.error('Failed to fetch user default address');
        console.error('Failed to fetch user default address');
        // 기본 배송지가 없을 경우
        setOrderDetails((prevState) => ({
          ...prevState,
          customerName: name || '', // AuthContext의 name을 설정
        }));
      }
    } catch (error) {
      console.error('Error fetching user default address', error);
      console.error('Failed to fetch user default address');
      // 기본 배송지가 없을 경우
      setOrderDetails((prevState) => ({
        ...prevState,
        customerName: name || '', // AuthContext의 name을 설정
      }));
    }
  };

  // 사용자 배송지들 불러오기
  const fetchUserAddresses = async (userId: number) => {
    try {
      const response = await axios.get(`/api/shipadd/${userId}/all`);
      if (response.status === 200) {
        setAddresses(response.data);
      } else {
        console.error('Failed to fetch user addresses');
      }
    } catch (error) {
      console.error('Error fetching user addresses', error);
    }
  };

  //배송지 목록 중 선택
  const handleAddressSelect = (address: ShippingAddress) => {
    setOrderDetails({
      customerName: address.recipientName,
      phoneNumber: address.contact,
      postcode: address.postcode,
      add1: address.address,
      add2: address.addressDetail,
    });
    setIsAddressModalOpen(false);
  };

  const openAddressModal = () => {
    if(userId){
      fetchUserAddresses(userId);
    }
    setIsAddressModalOpen(true);
  };

  useEffect(() => {
    if (userId) {
      fetchUserDefaultAddress(userId);
    }
    if (selectedProducts) {
      setProducts(selectedProducts);
      const newTotalPrice = selectedProducts.reduce(
        (sum: number, product: Product) => {
          return sum + product.price *product.quantity;
        },
        0,
      );
      setTotalPrice(newTotalPrice);

      const newTotalDeliveryFee = newTotalPrice >= 50000 ? 0 : 2500;
      setTotalDeliveryFee(newTotalDeliveryFee);
    }
  }, [selectedProducts]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderDetails({
      ...orderDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  const completeHandler = (data:any) =>{
    console.log(data)
    setOrderDetails({
      ...orderDetails,
      postcode:data.zonecode,
      add1: data.address
    });
    setIsOpen(false); //추가
  }
  // 검색 클릭
  const handleAddressSearch = () =>{
    setIsOpen(!isOpen);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Order Details:', orderDetails);
    console.log('Products:', products);
    console.log('Payment Method:', paymentMethod);

    try {
      const response = await axios.post('/api/order', {
        userId,
        orderDetails,
        products,
        total: totalPrice,
        shippingFee: totalDeliveryFee,
      });

      if (response.status === 200) {
        alert('주문이 성공적으로 완료되었습니다.');
        // 추가적으로 주문 완료 후 동작 (예: 페이지 이동, 상태 초기화 등)
      } else {
        alert('주문 처리 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('주문 처리 중 오류 발생:', error);
      alert('주문 처리 중 오류가 발생했습니다.');
    }
  };

  const AddressItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background-color: #ccc;
      cursor: pointer;
    }
  `;

  const AddressBox = styled.div`
    flex: none;
    width: 70px;
    white-space: nowrap;
`;

  const AddressContent = styled.div`
  flex: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

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
          <Btn type="button" onClick={openAddressModal}>나의 배송지 목록</Btn>
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
            id="postcode"
            name="postcode"
            value={orderDetails.postcode}
            onChange={handleInputChange}
            placeholder="우편번호 검색을 클릭하여 정확한 주소를 입력해주세요."
            readOnly
          />
          <Btn type="button" onClick={handleAddressSearch}>우편번호 검색</Btn>
        </InfoRow>
        <InfoRow>
          <InputLabel></InputLabel>
          <InputInfo
              id="add1"
              name="add1"
              value={orderDetails.add1}
              onChange={handleInputChange}
              placeholder="우편번호 검색을 클릭하여 정확한 주소를 입력해주세요."
              readOnly
          />
        </InfoRow>
        <InfoRow>
          <InputLabel></InputLabel>
          <InputInfo
              id="add2"
              name="add2"
              value={orderDetails.add2}
              onChange={handleInputChange}
              placeholder="상세 주소를 입력해주세요."
          />
        </InfoRow>
        <LightDivider />
        <h2>결제 상품 정보</h2>
        {products.map((product, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <OrderInformation src={product.imageUrl} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <OrderInfoRow key={index}>
                <div>상품명: {product.name}</div>
                <div>수량: {product.quantity}개</div>
                <div>가격: {product.price.toLocaleString()}원</div>
              </OrderInfoRow>
            </div>
          </div>
        ))}
        <PriceRow>
          <StrongText>총 결제 금액</StrongText>
          <TotalPriceTxt>
            {(totalPrice + totalDeliveryFee).toLocaleString()}원
          </TotalPriceTxt>
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
      <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
      >
        <Box sx={{ width: '400px', height: '500px', margin: 'auto', marginTop: '10%', backgroundColor: 'white', padding: '20px', boxShadow: 24 }}>
          <DaumPostcode onComplete={completeHandler} />
        </Box>
      </Modal>
      <Modal
          open={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
      >
        <Box sx={{ width: '400px', height: '500px', margin: 'auto', marginTop: '10%', backgroundColor: 'white', padding: '20px', boxShadow: 24 }}>
          <Box sx={{mb: 2}}><h2 id="modal-title">배송지 목록</h2></Box>
          {addresses.length === 0 ? (
              <p>등록된 배송지 목록이 없습니다.</p>
          ) : (
              <ul>
                {addresses.map((address, index) => (
                    <AddressItem key={index} onClick={() => handleAddressSelect(address)}>
                      <AddressBox>{address.addressName}</AddressBox>
                      <AddressContent>:  {address.address} {address.addressDetail} </AddressContent>
                    </AddressItem>
                ))}
              </ul>
          )}
        </Box>
      </Modal>
    </PageContainer>
  );
};

export default OrderPage;
