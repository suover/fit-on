import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Checkbox,
  Typography,
  Pagination,
  Box,
  TableRow,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import {
  ButtonGroups,
  HeaderTableCell,
} from '../../styles/shoppingBasket/ShoppingBasket.styles';
import GenericButton from '../../components/common/genericButton/GenericButton';

const ShoppingBasketPage: React.FC = () => {
  const initialItems: {
    id: number;
    imageUrl: string;
    name: string;
    quantity: number;
    price: number;
    deliveryFee: number;
  }[] = [
    {
      id: 1,
      imageUrl:
        'https://img.danawa.com/prod_img/500000/020/308/img/5308020_1.jpg?_v=20221202170053',
      name: '츄어블 비타민D 레몬맛',
      quantity: 1,
      price: 5000,
      deliveryFee: 2500,
    },
    {
      id: 2,
      imageUrl:
        'https://img.danawa.com/prod_img/500000/300/189/img/5189300_1.jpg?_v=20230714130047',
      name: '눈 건강 젤리 베리믹스맛',
      quantity: 1,
      price: 5000,
      deliveryFee: 2500,
    },
    {
      id: 3,
      imageUrl:
        'https://www.costco.co.kr/medias/sys_master/images/hea/h88/33419840749598.jpg',
      name: '프로바이오틱스 요구르트맛',
      quantity: 2,
      price: 0,
      deliveryFee: 2500,
    },
    {
      id: 4,
      imageUrl:
        'https://img.danawa.com/prod_img/500000/020/308/img/5308020_1.jpg?_v=20221202170053',
      name: '비타민C 오렌지맛',
      quantity: 3,
      price: 5000,
      deliveryFee: 2500,
    },
    {
      id: 5,
      imageUrl:
        'https://quabdfrttgah10486813.cdn.ntruss.com/upload/item/1000000843/1000000843_ITEM.png',
      name: '칼슘 마그네슘 영양제',
      quantity: 1,
      price: 5000,
      deliveryFee: 2500,
    },
    {
      id: 6,
      imageUrl:
        'https://m.soonsoofood.co.kr/web/product/big/202403/20cd1a4cbe9b7db604ce73e6fc6b8871.jpg',
      name: '오메가3 피쉬오일',
      quantity: 2,
      price: 50000,
      deliveryFee: 2500,
    },
    {
      id: 7,
      imageUrl:
        'https://quabdfrttgah10486813.cdn.ntruss.com/upload/item/1000000843/1000000843_ITEM.png',
      name: '멀티비타민 종합영양제',
      quantity: 1,
      price: 5000,
      deliveryFee: 2500,
    },
    {
      id: 8,
      imageUrl:
        'https://m.daewoong.co.kr/attach/202002/7a4c48140f7745ca9403367b718315ff.jpg',
      name: '프로틴 바닐라맛',
      quantity: 2,
      price: 5000,
      deliveryFee: 2500,
    },
    {
      id: 9,
      imageUrl:
        'https://www.nanowellcare.com/mall/shop_image/202307/%BA%F1%C5%B8%B9%CEC_%C7%BB%BE%EE_%B9%F6%C6%DB%B5%E5_%C1%DF%BC%BA_1%B9%DA%BD%BA.png',
      name: '아이허브 비타민D',
      quantity: 3,
      price: 5000,
      deliveryFee: 2500,
    },
    {
      id: 10,
      imageUrl:
        'https://quabdfrttgah10486813.cdn.ntruss.com/upload/item/1000000843/1000000843_ITEM.png',
      name: '철분제 캡슐',
      quantity: 1,
      price: 3500,
      deliveryFee: 2500,
    },
  ];

  const [items, setItems] = useState(initialItems);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);

  useEffect(() => {
    const totalAmount = selectedItems.reduce((acc, id) => {
      const item = items.find((item) => item.id === id);
      return item ? acc + item.price : acc;
    }, 0);
    const totalDeliveryFee =
      totalAmount >= 50000 ? 0 : selectedItems.length > 0 ? 2500 : 0;

    setTotalAmount(totalAmount);
    setTotalDeliveryFee(totalDeliveryFee);
  }, [selectedItems]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDeleteItems = () => {
    setItems(items.filter((item) => !selectedItems.includes(item.id)));
    setSelectedItems([]);
    setSelectAll(false);
    setOpenDeleteDialog(false);
  };

  const handleOrderSelectedItems = () => {
    const selectedProducts = items.filter((item) =>
      selectedItems.includes(item.id),
    );
    navigate('/order-page', { state: { selectedProducts } });
    setOpenOrderDialog(false);
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const paginatedItems = items.slice(
    (page - 1) * rowsPerPage,
    (page - 1) * rowsPerPage + rowsPerPage,
  );

  return (
    <Container>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '30px',
          marginBottom: '30px',
        }}
        variant="h4"
        gutterBottom
      >
        장바구니
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderTableCell>
                <Checkbox
                  checked={selectAll}
                  indeterminate={
                    selectedItems.length > 0 &&
                    selectedItems.length < items.length
                  }
                  onChange={handleSelectAll}
                />
              </HeaderTableCell>
              <HeaderTableCell align="center">상품명</HeaderTableCell>
              <HeaderTableCell align="center">수량</HeaderTableCell>
              <HeaderTableCell align="center">상품금액</HeaderTableCell>
              <HeaderTableCell align="center">합계금액</HeaderTableCell>
              <HeaderTableCell align="center"></HeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                  />
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt="#"
                    style={{
                      width: '100px',
                      height: '100px',
                      marginRight: '10px',
                    }}
                  />
                  {item.name}
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">
                  {item.price.toLocaleString()} 원
                </TableCell>
                <TableCell align="center">
                  {item.price.toLocaleString()} 원
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" my={2}>
        <Pagination
          count={Math.ceil(items.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
        />
      </Box>

      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          backgroundColor: '#f5f5f5',
          border: 'none',
          borderRadius: '12px',
          height: '40px',
          paddingTop: '15px',
          paddingRight: '5px',
          fontSize: '1rem',
        }}
        variant="h6"
        gutterBottom
      >
        총 {selectedItems.length}개의 상품금액 {totalAmount.toLocaleString()} 원
        + 배송비 {totalDeliveryFee.toLocaleString()} 원 ={' '}
        {(totalAmount + totalDeliveryFee).toLocaleString()} 원
      </Typography>
      <span
        style={{
          fontSize: '0.8rem',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        주문금액 5만원 이상시 배송비 무료(기본 배송료 2500원)
      </span>

      <ButtonGroups>
        <Link to="/mall">
          <GenericButton>쇼핑 계속하기</GenericButton>
        </Link>
        <GenericButton onClick={() => setOpenDeleteDialog(true)}>
          상품 삭제
        </GenericButton>
        <GenericButton
          style={{ marginLeft: '12.5px' }}
          onClick={() => setOpenOrderDialog(true)}
        >
          상품 주문
        </GenericButton>
      </ButtonGroups>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>상품 삭제 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>선택한 상품을 삭제하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>취소</Button>
          <Button onClick={handleDeleteItems} color="primary">
            삭제
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openOrderDialog} onClose={() => setOpenOrderDialog(false)}>
        <DialogTitle>상품 주문 확인</DialogTitle>
        <DialogContent>
          <DialogContentText>선택한 상품을 주문하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOrderDialog(false)}>취소</Button>
          <Button onClick={handleOrderSelectedItems} color="primary">
            주문
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ShoppingBasketPage;
