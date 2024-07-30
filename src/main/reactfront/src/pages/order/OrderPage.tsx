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
  AddressItem,
  AddressBox,
  AddressContent,
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
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false); //주소Modal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState<number>(0);

  // AuthContext 에서 유저 아이디 및 이름 받아오기
  const { userId, name } = useContext(AuthContext);


  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

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
        setOrderDetails((prevState) => ({
          ...prevState,
          customerName: name || '',
        }));
      }
    } catch (error) {
      console.error('Error fetching user default address', error);
      setOrderDetails((prevState) => ({
        ...prevState,
        customerName: name || '',
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

  const completeHandler = (data:any) =>{
    console.log(data)
    setOrderDetails({
      ...orderDetails,
      postcode:data.zonecode,
      add1: data.address
    });
    setIsOpen(false);
  }

  //주소 검색
  const handleAddressSearch = () =>{
    setIsOpen(!isOpen);
  }

  const requestINICIS = () => {
    const { IMP } = window as any;
    if (!IMP) {
      alert("결제 모듈이 로드되지 않았습니다.");
      return;
    }
    IMP.init('imp87866800');

    const productName = products.length > 1 ? `${products[0].name} 외 ${products.length - 1}개` : products[0].name;

    IMP.request_pay({
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `mid_${new Date().getTime()}`,
      name: productName,
      amount: totalPrice + totalDeliveryFee,
      buyer_email: 'test@naver.com',
      buyer_name: orderDetails.customerName,
      buyer_tel: orderDetails.phoneNumber,
      buyer_addr: `${orderDetails.add1} ${orderDetails.add2}`,
      buyer_postcode: orderDetails.postcode,
    }, async (rsp: any) => {
      if (rsp.success) {
        await handleOrderSuccess(rsp);
      } else {
        alert(`결제 실패: ${rsp.error_msg}`);
      }
    });
  };

  // 결제 성공 시 처리 함수
  const handleOrderSuccess = async (paymentData :any) => {
    try {
      const response = await axios.post('/api/order', {
        userId,
        orderDetails,
        products,
        total: totalPrice,
        shippingFee: totalDeliveryFee,
        paymentData,
      });

      if (response.status === 200) {
        alert('주문이 성공적으로 완료되었습니다.');
      } else {
        alert('주문 처리 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('주문 처리 중 오류 발생:', error);
      alert('주문 처리 중 오류가 발생했습니다.');
    }
  };

  return (
      <PageContainer>
        <h1>주문서 작성</h1>
        <Divider />
        <h2>배송 정보</h2>
        <FormContainer onSubmit={(e) => e.preventDefault()}>
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
          <ButtonContainer>
            <Button type="button" onClick={requestINICIS}>결제하기</Button>
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
