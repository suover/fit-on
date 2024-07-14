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
import axios from 'axios';
import { CartItem } from '../../types/DataInterface';

const ShoppingBasketPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const navigate = useNavigate();
  // const userId = 36; // 관리자userid
  const [userId, setUserId] = useState<number | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);

  // 로컬 스토리지에서 userId를 가져오기
  const getUserIdFromLocalStorage = (): number | null => {
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId, 10) : null;
  };

  //장바구니 불러오기
  // useEffect(() => {
  //   const fetchCartItems = async () => {
  //     try {
  //       const response = await axios.get<CartItem[]>(
  //         `/api/carts/${userId}/cartItems`,
  //       );
  //       if (response.status === 200) {
  //         setItems(response.data);
  //       } else {
  //         console.error('Failed to fetch cart items');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching cart items', error);
  //     }
  //   };
  //
  //   fetchCartItems();
  // }, [userId]);
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = getUserIdFromLocalStorage();
        setUserId(userId);
        if (userId) {
          const response = await axios.get<CartItem[]>(
              `/api/carts/${userId}/cartItems`,
          );
          if (response.status === 200) {
            setItems(response.data);
          } else {
            console.error('Failed to fetch cart items');
          }
        } else {
          console.error('No user ID found in local storage');
        }
      } catch (error) {
        console.error('Error fetching cart items', error);
      }
    };
    fetchCartItems();
  }, []);


  // 상품 삭제 api
  const deleteCartItems = async (productIds: number[]) => {
    console.log("Attempting to delete items from cart: ", productIds);
    if (userId) {
      try {
        await axios({
          method: 'delete',
          url: `/api/carts/${userId}/cartItems`,
          data: productIds,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("Successfully deleted items from cart: ", productIds);
        // 서버에서 삭제 성공 시, 프론트엔드 상태 반영
        setItems((prevItems) => prevItems.filter((item) => !productIds.includes(item.productId)));
        setSelectedItems([]);
        setSelectAll(false);
      } catch (error) {
        console.error('Error deleting cart items', error);
      }
    } else {
      console.error('No user ID found, cannot delete items');
    }
  };

  useEffect(() => {
    const totalAmount = selectedItems.reduce((acc, id) => {
      const cartItem = items.find((cartItem) => cartItem.productId === id);
      return cartItem ? acc + cartItem.price * cartItem.quantity : acc;
    }, 0);
    const totalDeliveryFee =
      totalAmount >= 50000 ? 0 : selectedItems.length > 0 ? 2500 : 0;

    setTotalAmount(totalAmount);
    setTotalDeliveryFee(totalDeliveryFee);
  }, [selectedItems, items]);

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map((item) => item.productId));
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

  // const handleDeleteItems = () => {
  //   setItems(items.filter((item) => !selectedItems.includes(item.productId)));
  //   setSelectedItems([]);
  //   setSelectAll(false);
  //   setOpenDeleteDialog(false);
  // };
  const handleDeleteItems = () => {
    deleteCartItems(selectedItems);
    setOpenDeleteDialog(false);
  };

  const handleOrderSelectedItems = () => {
    const selectedProducts = items.filter((item) =>
      selectedItems.includes(item.productId),
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
              <TableRow key={item.cartItemId}>
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.productId)}
                    onChange={() => handleSelectItem(item.productId)}
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
                    src={item.imageUrl || ''}
                    alt="#"
                    style={{
                      width: '100px',
                      height: '100px',
                      marginRight: '10px',
                    }}
                  />
                  {item.name || ''}
                </TableCell>
                <TableCell align="center">{item.quantity}</TableCell>
                <TableCell align="center">
                  {item.price.toLocaleString() || 0} 원
                </TableCell>
                <TableCell align="center">
                  {(item.price * item.quantity).toLocaleString() || 0} 원
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
