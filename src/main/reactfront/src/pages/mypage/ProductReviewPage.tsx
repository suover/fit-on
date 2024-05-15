import React, { useState, useMemo } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GenericTable from '../../components/genericTable/GenericTable';
import SearchBox from '../../components/common/search/SearchBox';
import {
  TableRow,
  TableData,
  Image,
  DetailContainer,
  PrimaryText,
} from '../../components/genericTable/GenericTable.styles';
import StyledTypography from '../../styles/mypage/StyledTypography';

const columns = [
  { id: 'id', label: '번호', width: 50 },
  { id: 'productName', label: '상품명', width: 200 },
  { id: 'purchaseDate', label: '구매일자', width: 100 },
  { id: 'rating', label: '평점', width: 50 },
  { id: 'review', label: '리뷰', width: 250 },
  { id: 'actions', label: '수정 / 삭제', width: 100 },
];

export interface Review {
  id: string;
  productName: string;
  purchaseDate: string;
  rating: number;
  review: string;
  photoUrl: string;
  [key: string]: any;
}

const initialReviews: Review[] = Array.from({ length: 15 }, (_, index) => ({
  id: (index + 1).toString(),
  productName: `상품 ${index + 1}`,
  purchaseDate: `2024-05-${String(index + 1).padStart(2, '0')}`,
  rating: Math.floor(Math.random() * 5) + 1,
  review: `이것은 테스트 리뷰 ${index + 1}입니다.`,
  photoUrl: 'https://source.unsplash.com/random',
}));

function ProductReviewPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [searchText, setSearchText] = useState('');
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return reviews;
    const query = searchText.toLowerCase();
    return reviews.filter((review) =>
      columns.some((col) =>
        (review[col.id as keyof Review]?.toString() || '')
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [reviews, searchText]);

  const handleSearch = (query: string) => setSearchText(query);

  const handleDeleteClick = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    setReviews(reviews.filter((review) => review.id !== selectedReviewId));
    setIsDeleteConfirmationOpen(false);
    setSelectedReviewId(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setSelectedReviewId(null);
  };

  const renderRow = (review: Review) => {
    return (
      <TableRow key={review.id}>
        <TableData>{review.id}</TableData>
        <TableData>
          <Image $backgroundImage={review.photoUrl} />
          <DetailContainer>
            <PrimaryText>{review.productName}</PrimaryText>
          </DetailContainer>
        </TableData>
        <TableData>{review.purchaseDate}</TableData>
        <TableData>{`${review.rating} / 5`}</TableData>
        <TableData>{review.review}</TableData>
        <TableData>
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}
          >
            <EditIcon style={{ cursor: 'pointer' }} />
            <DeleteIcon
              onClick={() => handleDeleteClick(review.id)}
              style={{ cursor: 'pointer' }}
            />
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
        <StyledTypography>상품 리뷰</StyledTypography>
        <Box width="25ch">
          <SearchBox onSearch={handleSearch} styleProps={{ width: '100%' }} />
        </Box>
      </Box>
      <GenericTable<Review>
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
        <DialogTitle id="alert-dialog-title">{'리뷰 삭제 확인'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말로 이 리뷰를 삭제하시겠습니까?
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
    </Box>
  );
}

export default ProductReviewPage;
