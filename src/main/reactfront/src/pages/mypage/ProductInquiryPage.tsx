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
  PrimaryText,
  StatusIndicator,
  Image,
  DetailContainer,
} from '../../components/genericTable/GenericTable.styles';
import StyledTypography from '../../styles/mypage/StyledTypography';

const columns = [
  { id: 'id', label: '번호', width: 50 },
  { id: 'productName', label: '상품명', width: 200 },
  { id: 'title', label: '제목', width: 200 },
  { id: 'inquiryDate', label: '문의일자', width: 100 },
  { id: 'status', label: '상태', width: 100 },
  { id: 'actions', label: '수정 / 삭제', width: 100 },
];

export interface Inquiry {
  id: string;
  productName: string;
  title: string;
  inquiryDate: string;
  status: string;
  photoUrl: string;
  [key: string]: any;
}

const initialInquiries: Inquiry[] = Array.from({ length: 15 }, (_, index) => ({
  id: (index + 1).toString(),
  productName: `상품 ${index + 1}`,
  title: `상품 ${index + 1}의 사용법 문의`,
  inquiryDate: `2024-05-${String(index + 1).padStart(2, '0')}`,
  status: ['답변 완료', '답변 대기'][Math.floor(Math.random() * 2)],
  photoUrl: `https://source.unsplash.com/random?product-${index + 1}`,
}));

const getStatusStyles = (status: string) => {
  switch (status) {
    case '답변 완료':
      return { color: 'blue', backgroundColor: '#d0eaff' };
    case '답변 대기':
      return { color: 'orange', backgroundColor: '#fff4e6' };
    default:
      return { color: '#9eabb4', backgroundColor: '#f2f4f7' };
  }
};

const dummyInquiry: Inquiry[] = [
  {
    id: '1',
    productName: '체스트 프레스 머신',
    title: '체스트 프레스 머신 설치 방법 문의',
    inquiryDate: '2024-05-29',
    status: '답변 대기',
    photoUrl:
      'https://m.fitboon.com/web/product/big/202107/a0ed4f360594c8ed9c3ad0959d5f3b1b.jpg',
  },
  {
    id: '2',
    productName: '바벨 세트',
    title: '바벨 세트 무게 문의',
    inquiryDate: '2024-05-12',
    status: '답변 완료',
    photoUrl:
      'https://contents.lotteon.com/itemimage/_v154406/LO/12/74/44/77/93/_1/27/44/47/79/4/LO1274447793_1274447794_1.jpg/dims/optimize/dims/resizemc/400x400',
  },
  {
    id: '3',
    productName: '트레드밀',
    title: '트레드밀 유지보수 관련 문의',
    inquiryDate: '2024-05-09',
    status: '답변 완료',
    photoUrl:
      'https://pama.co.kr/web/product/big/202109/5852cd81ec9e89aae24fbef3d44c10c2.png',
  },
  {
    id: '4',
    productName: '푸쉬업 바',
    title: '푸쉬업 바 사용법 문의',
    inquiryDate: '2024-05-03',
    status: '답변 완료',
    photoUrl:
      'https://i.namu.wiki/i/MzYUJekuBNMqQw1s4iPLxJ0uzRJpc-3rRld209TY_B54bOrvJJ-fhQTqg9_nAuJHYlZCx7_3cICEU_LJlbzlRw.webp',
  },
];

function ProductInquiryPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(dummyInquiry);
  const [searchText, setSearchText] = useState('');
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(
    null,
  );

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return inquiries;
    const query = searchText.toLowerCase();
    return inquiries.filter((inquiry) =>
      columns.some((col) =>
        (inquiry[col.id as keyof Inquiry]?.toString() || '')
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [inquiries, searchText]);

  const handleSearch = (query: string) => setSearchText(query);

  const handleDeleteClick = (inquiryId: string) => {
    setSelectedInquiryId(inquiryId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    setInquiries(
      inquiries.filter((inquiry) => inquiry.id !== selectedInquiryId),
    );
    setIsDeleteConfirmationOpen(false);
    setSelectedInquiryId(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setSelectedInquiryId(null);
  };

  const handleEditClick = (inquiryId: string) => {};

  const renderRow = (inquiry: Inquiry) => {
    const statusStyles = getStatusStyles(inquiry.status);
    return (
      <TableRow key={inquiry.id}>
        <TableData>{inquiry.id}</TableData>
        <TableData>
          <DetailContainer>
            <Image $backgroundImage={inquiry.photoUrl} />
            <PrimaryText>{inquiry.productName}</PrimaryText>
          </DetailContainer>
        </TableData>
        <TableData>{inquiry.title}</TableData>
        <TableData>{inquiry.inquiryDate}</TableData>
        <TableData>
          <StatusIndicator
            $color={statusStyles.color}
            $backgroundColor={statusStyles.backgroundColor}
          >
            {inquiry.status}
          </StatusIndicator>
        </TableData>
        <TableData>
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}
          >
            <EditIcon
              onClick={() => handleEditClick(inquiry.id)}
              style={{ cursor: 'pointer' }}
            />
            <DeleteIcon
              onClick={() => handleDeleteClick(inquiry.id)}
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
        <StyledTypography>상품 문의</StyledTypography>
        <Box width="25ch">
          <SearchBox onSearch={handleSearch} styleProps={{ width: '100%' }} />
        </Box>
      </Box>
      <GenericTable<Inquiry>
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
        <DialogTitle id="alert-dialog-title">{'문의 삭제 확인'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            정말로 이 문의를 삭제하시겠습니까?
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

export default ProductInquiryPage;
