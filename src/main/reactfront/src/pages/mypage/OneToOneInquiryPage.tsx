import React, { useState, useMemo } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
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
} from '../../components/genericTable/GenericTable.styles';
import StyledTypography from '../../styles/mypage/StyledTypography';
import GenericButton from '../../components/common/genericButton/GenericButton';

const columns = [
  { id: 'id', label: '번호', width: 50 },
  { id: 'title', label: '제목', width: 200 },
  { id: 'inquiryType', label: '문의유형', width: 150 },
  { id: 'inquiryDate', label: '문의일자', width: 150 },
  { id: 'status', label: '상태', width: 100 },
  { id: 'actions', label: '수정 / 삭제', width: 100 },
];

export interface OneToOneInquiry {
  id: string;
  title: string;
  inquiryType: string;
  inquiryDate: string;
  status: string;
  [key: string]: any;
}

const initialInquiries: OneToOneInquiry[] = Array.from(
  { length: 15 },
  (_, index) => ({
    id: (index + 1).toString(),
    title: `문의 제목 ${index + 1}`,
    inquiryType: ['배송', '사용법', '기타'][Math.floor(Math.random() * 3)],
    inquiryDate: `2024-05-${String(index + 1).padStart(2, '0')}`,
    status: ['답변 완료', '답변 대기'][Math.floor(Math.random() * 2)],
  }),
);

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

const dummyInquiryData: OneToOneInquiry[] = [
  {
    id: '1',
    title: '제품 환불 요청',
    inquiryType: '환불',
    inquiryDate: '2024-05-28',
    status: '답변 대기',
  },
  {
    id: '2',
    title: '배송 지연 문의',
    inquiryType: '배송',
    inquiryDate: '2024-05-16',
    status: '답변 완료',
  },
  {
    id: '3',
    title: '제품 교환 문의',
    inquiryType: '교환',
    inquiryDate: '2024-05-12',
    status: '답변 완료',
  },
  {
    id: '4',
    title: '제품 사용법 문의',
    inquiryType: '사용법',
    inquiryDate: '2024-05-08',
    status: '답변 완료',
  },
  {
    id: '5',
    title: '구매 취소 요청',
    inquiryType: '취소',
    inquiryDate: '2024-05-05',
    status: '답변 완료',
  },
  {
    id: '6',
    title: '제품 품질 문의',
    inquiryType: '품질',
    inquiryDate: '2024-05-02',
    status: '답변 완료',
  },
  {
    id: '7',
    title: '결제 오류 문의',
    inquiryType: '결제',
    inquiryDate: '2024-4-30',
    status: '답변 완료',
  },
];

function OneToOneInquiryPage() {
  const [inquiries, setInquiries] =
    useState<OneToOneInquiry[]>(dummyInquiryData);
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
        (inquiry[col.id as keyof OneToOneInquiry]?.toString() || '')
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

  const renderRow = (inquiry: OneToOneInquiry) => {
    const statusStyles = getStatusStyles(inquiry.status);
    return (
      <TableRow key={inquiry.id}>
        <TableData>{inquiry.id}</TableData>
        <TableData>
          <PrimaryText>{inquiry.title}</PrimaryText>
        </TableData>
        <TableData>{inquiry.inquiryType}</TableData>
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
        <StyledTypography>1:1 문의 내역</StyledTypography>
        <Box sx={{ width: '25ch' }}>
          <SearchBox onSearch={handleSearch} styleProps={{ width: '100%' }} />
        </Box>
      </Box>
      <GenericTable<OneToOneInquiry>
        data={filteredData}
        columns={columns}
        rowsPerPage={10}
        includeCheckboxes={false}
        renderRow={renderRow}
      />
      <Box sx={{ position: 'relative' }}>
        <GenericButton
          style={{ position: 'absolute', right: 0, bottom: '-8px' }}
        >
          문의 등록
        </GenericButton>
      </Box>
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

export default OneToOneInquiryPage;
