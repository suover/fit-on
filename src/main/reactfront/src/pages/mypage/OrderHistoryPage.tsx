import React, { useState, useMemo, useRef } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Rating,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import StarIcon from '@mui/icons-material/Star';
import GenericTable from '../../components/genericTable/GenericTable';
import SearchBox from '../../components/common/search/SearchBox';
import {
  TableRow,
  TableData,
  Image,
  DetailContainer,
  PrimaryText,
  StatusIndicator,
  Category,
} from '../../components/genericTable/GenericTable.styles';
import StyledTypography from '../../styles/mypage/StyledTypography';

const columns = [
  { id: 'id', label: '번호', width: 50 },
  { id: 'name', label: '상품', width: 200 },
  { id: 'amount', label: '금액', width: 100 },
  { id: 'quantity', label: '수량', width: 50 },
  { id: 'paymentAmount', label: '결제금액', width: 100 },
  { id: 'destination', label: '배송지', width: 100 },
  { id: 'deliveryStatus', label: '배송 상태', width: 100 },
  { id: 'review', label: '리뷰', width: 100 },
  { id: 'delete', label: '삭제', width: 100 },
];

export interface Order {
  id: string;
  name: string;
  quantity: number;
  amount: number;
  category: string;
  destination: string;
  deliveryStatus: string;
  photoUrl: string;
  [key: string]: any;
}

const initialOrders: Order[] = [
  {
    id: '1',
    name: '푸쉬업 바',
    quantity: 2,
    amount: 9900,
    category: '운동기구',
    destination: '우리집',
    deliveryStatus: '결제완료',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '2',
    name: '시원해요 안마기',
    quantity: 1,
    amount: 29000,
    category: '건강',
    destination: '너네집',
    deliveryStatus: '배송준비중',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '3',
    name: '요가 매트',
    quantity: 1,
    amount: 15000,
    category: '운동기구',
    destination: '서울시 강남구',
    deliveryStatus: '배송완료',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '4',
    name: '블루투스 이어폰',
    quantity: 1,
    amount: 46000,
    category: '전자제품',
    destination: '서울시 서대문구',
    deliveryStatus: '배송중',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '5',
    name: '프로틴 쉐이크',
    quantity: 3,
    amount: 30000,
    category: '건강',
    destination: '부산시 해운대구',
    deliveryStatus: '배송완료',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '6',
    name: '런닝화',
    quantity: 1,
    amount: 110000,
    category: '운동기구',
    destination: '인천시 연수구',
    deliveryStatus: '배송중',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '7',
    name: '등산배낭',
    quantity: 1,
    amount: 80000,
    category: '여행',
    destination: '대전시 유성구',
    deliveryStatus: '배송완료',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '8',
    name: '수영복',
    quantity: 2,
    amount: 35000,
    category: '운동기구',
    destination: '경기도 수원시',
    deliveryStatus: '배송중',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '9',
    name: '캠핑 의자',
    quantity: 4,
    amount: 25000,
    category: '여행',
    destination: '제주도 서귀포시',
    deliveryStatus: '배송준비중',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '10',
    name: '골프채 세트',
    quantity: 1,
    amount: 450000,
    category: '운동기구',
    destination: '서울시 노원구',
    deliveryStatus: '결제완료',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '11',
    name: '자동차용 청소기',
    quantity: 1,
    amount: 35000,
    category: '전자제품',
    destination: '울산시 북구',
    deliveryStatus: '배송중',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '12',
    name: '텀블러',
    quantity: 3,
    amount: 12000,
    category: '건강',
    destination: '부산시 남구',
    deliveryStatus: '배송완료',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '13',
    name: '햇빛 가리개',
    quantity: 2,
    amount: 25000,
    category: '가정용품',
    destination: '인천시 남동구',
    deliveryStatus: '결제완료',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '14',
    name: '맥북 프로',
    quantity: 1,
    amount: 2500000,
    category: '전자제품',
    destination: '서울시 마포구',
    deliveryStatus: '배송준비중',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '15',
    name: '운동용 바지',
    quantity: 2,
    amount: 19000,
    category: '운동기구',
    destination: '경기도 안양시',
    deliveryStatus: '배송완료',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '16',
    name: '게임 콘솔',
    quantity: 1,
    amount: 400000,
    category: '전자제품',
    destination: '서울시 영등포구',
    deliveryStatus: '배송준비중',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '17',
    name: '등산 스틱',
    quantity: 2,
    amount: 48000,
    category: '여행',
    destination: '광주시 서구',
    deliveryStatus: '배송중',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '18',
    name: '필통',
    quantity: 4,
    amount: 6000,
    category: '가정용품',
    destination: '대구시 동구',
    deliveryStatus: '배송완료',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '19',
    name: '세라믹 식기 세트',
    quantity: 1,
    amount: 150000,
    category: '가정용품',
    destination: '서울시 중랑구',
    deliveryStatus: '배송준비중',
    photoUrl: 'https://source.unsplash.com/random',
  },
  {
    id: '20',
    name: '폴라로이드 카메라',
    quantity: 1,
    amount: 80000,
    category: '전자제품',
    destination: '충주시 충원동',
    deliveryStatus: '결제완료',
    photoUrl: 'https://source.unsplash.com/random',
  },
];
const labels: { [index: string]: string } = {
  0.5: '0.5',
  1: '1',
  1.5: '1.5',
  2: '2',
  2.5: '2.5',
  3: '3',
  3.5: '3.5',
  4: '4',
  4.5: '4.5',
  5: '5',
};

const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case '결제완료':
      return { color: '#8d9fa7', backgroundColor: '#8d9fa7' };
    case '배송준비중':
      return { color: '#bbcc70', backgroundColor: '#bbcc70' };
    case '배송중':
      return { color: '#6cdb56', backgroundColor: '#6cdb56' };
    case '배송완료':
      return { color: 'dodgerblue', backgroundColor: 'dodgerblue' };
    default:
      return { color: '#9eabb4', backgroundColor: '#9eabb4' };
  }
};

function OrderHistoryPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchText, setSearchText] = useState('');
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [isSubmitConfirmationOpen, setIsSubmitConfirmationOpen] =
    useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewPhotos, setReviewPhotos] = useState<(File | null)[]>(
    Array(5).fill(null),
  );
  const [reviewText, setReviewText] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState<number | null>(0);
  const [hover, setHover] = React.useState(-1);

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return orders;
    const query = searchText.toLowerCase();
    return orders.filter((order) =>
      columns.some((col) =>
        (order[col.id as keyof Order]?.toString() || '')
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [orders, searchText]);

  const handleSearch = (query: string) => setSearchText(query);

  const handleDeleteClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    setOrders(orders.filter((order) => order.id !== selectedOrderId));
    setIsDeleteConfirmationOpen(false);
    setSelectedOrderId(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setSelectedOrderId(null);
  };

  const handleReviewClick = (order: Order) => {
    setSelectedOrder(order);
    setIsReviewModalOpen(true);
  };

  const handleReviewClose = () => {
    setIsReviewModalOpen(false);
    setReviewPhotos(Array(5).fill(null));
    setReviewText('');
    setSelectedImageIndex(null);
  };

  const handleReviewSubmit = () => {
    setIsSubmitConfirmationOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsSubmitConfirmationOpen(false);
    handleReviewClose();
  };

  const handleCancelSubmit = () => {
    setIsSubmitConfirmationOpen(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && selectedImageIndex !== null) {
      const file = event.target.files[0];
      const newReviewPhotos = [...reviewPhotos];
      newReviewPhotos[selectedImageIndex] = file;
      setReviewPhotos(newReviewPhotos);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

  const renderRow = (order: Order) => {
    const statusStyles = getStatusStyles(order.deliveryStatus);
    const totalAmount = order.quantity * order.amount;
    return (
      <TableRow key={order.id}>
        <TableData>{order.id}</TableData>
        <TableData>
          <Image $backgroundImage={order.photoUrl} />
          <DetailContainer>
            <PrimaryText>{order.name}</PrimaryText>
            <Category>{order.category}</Category>
          </DetailContainer>
        </TableData>
        <TableData>{`${order.amount.toLocaleString()} 원`}</TableData>
        <TableData>{`${order.quantity} 개`}</TableData>
        <TableData>{`${totalAmount.toLocaleString()} 원`}</TableData>
        <TableData>{order.destination}</TableData>
        <TableData>
          <StatusIndicator
            $color={statusStyles.color}
            $backgroundColor={statusStyles.backgroundColor}
          >
            {order.deliveryStatus}
          </StatusIndicator>
        </TableData>
        <TableData>
          <Button
            sx={{
              color: 'black',
              borderBottom: '1px solid black',
              height: '20px',
            }}
            onClick={() => handleReviewClick(order)}
          >
            리뷰작성
          </Button>
        </TableData>
        <TableData>
          <div
            onClick={() => handleDeleteClick(order.id)}
            style={{ cursor: 'pointer' }}
          >
            <DeleteIcon />
          </div>
        </TableData>
      </TableRow>
    );
  };

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={4}
        marginTop={2}
      >
        <StyledTypography>주문 내역</StyledTypography>
        <Box
          sx={{
            width: '25ch',
            marginLeft: 1,
          }}
        >
          <SearchBox onSearch={handleSearch} styleProps={{ width: '100%' }} />
        </Box>
      </Box>
      <GenericTable<Order>
        data={filteredData}
        columns={columns}
        rowsPerPage={10}
        includeCheckboxes={false}
        renderRow={renderRow}
      />
      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'메시지'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말로 삭제하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            취소
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isReviewModalOpen}
        onClose={handleReviewClose}
        aria-labelledby="review-dialog-title"
        aria-describedby="review-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle id="review-dialog-title">{'리뷰 작성'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="review-dialog-producName">
            상품명
          </DialogContentText>
          <DialogContentText>{selectedOrder?.name}</DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="review-dialog-stars">평점</DialogContentText>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="review-dialog-images">
            최대 5개의 사진을 업로드하세요.
          </DialogContentText>

          <input
            ref={fileInputRef}
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleFileChange}
          />
          <Box
            mt={2}
            display="flex"
            justifyContent="flex-start"
            flexWrap="wrap"
          >
            {reviewPhotos.map((file, index) => (
              <Box
                key={index}
                width={100}
                height={100}
                m={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                border="1px solid #ccc"
                borderRadius="4px"
                onClick={() => handleImageClick(index)}
                sx={{ cursor: 'pointer' }}
              >
                {file ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`review-${index}`}
                    width="100%"
                    height="100%"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <ImageIcon style={{ color: '#ccc', fontSize: 48 }} />
                )}
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="review-dialog-reivewText">
            리뷰를 작성하세요.
          </DialogContentText>
          <TextField
            margin="dense"
            id="review-text"
            label="리뷰"
            type="text"
            fullWidth
            variant="outlined"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewClose} color="primary">
            취소
          </Button>
          <Button onClick={handleReviewSubmit} color="primary" autoFocus>
            작성
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isSubmitConfirmationOpen}
        onClose={handleCancelSubmit}
        aria-labelledby="submit-confirmation-dialog-title"
        aria-describedby="submit-confirmation-dialog-description"
      >
        <DialogTitle id="submit-confirmation-dialog-title">
          {'작성 확인'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="submit-confirmation-dialog-description">
            정말로 작성하시겠습니까?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSubmit} color="primary">
            취소
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary" autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default OrderHistoryPage;
