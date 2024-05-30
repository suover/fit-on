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
  { id: 'type', label: '종류', width: 100 },
  { id: 'status', label: '상태', width: 100 },
  { id: 'delete', label: '삭제', width: 100 },
];

export interface ReturnExchange {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  paymentAmount: number;
  type: '취소' | '반품' | '교환';
  status: string;
  category: string;
  photoUrl: string;
  [key: string]: any;
}

const initialData: ReturnExchange[] = Array.from(
  { length: 15 },
  (_, index) => ({
    id: (index + 1).toString(),
    name: `상품 ${index + 1}`,
    amount: Math.floor(Math.random() * 50000) + 10000,
    quantity: Math.floor(Math.random() * 5) + 1,
    paymentAmount: Math.floor(Math.random() * 50000) + 10000,
    type: ['취소', '반품', '교환'][Math.floor(Math.random() * 3)] as
      | '취소'
      | '반품'
      | '교환',
    status: ['완료', '처리중', '접수'][Math.floor(Math.random() * 3)],
    category: ['운동기구', '건강', '전자제품', '여행', '가정용품'][
      Math.floor(Math.random() * 5)
    ],
    photoUrl: `https://source.unsplash.com/random?product-${index + 1}`,
  }),
);

const dummyReturn: ReturnExchange[] = [
  {
    id: '1',
    name: '크로스핏 케틀벨',
    amount: 45000,
    quantity: 2,
    paymentAmount: 90000,
    type: '취소',
    status: '취소완료',
    category: '운동기구',
    photoUrl:
      'data:image/jpeg;base64,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',
  },
  {
    id: '2',
    name: '복싱 글러브',
    amount: 60000,
    quantity: 1,
    paymentAmount: 60000,
    type: '취소',
    status: '취소완료',
    category: '운동용품',
    photoUrl: 'https://cdn.imweb.me/thumbnail/20220329/adcd115aaa58b.jpg',
  },
];

const getStatusStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case '접수':
      return { color: '#f39c12', backgroundColor: '#f39c12' };
    case '처리중':
      return { color: '#12d1f3', backgroundColor: '#12d1f3' };
    case '완료':
      return { color: 'dodgerblue', backgroundColor: 'dodgerblue' };
    default:
      return { color: '#9eabb4', backgroundColor: '#9eabb4' };
  }
};

function ReturnAndExchangePage() {
  const [data, setData] = useState<ReturnExchange[]>(dummyReturn);
  const [searchText, setSearchText] = useState('');
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const filteredData = useMemo(() => {
    if (!searchText.trim()) return data;
    const query = searchText.toLowerCase();
    return data.filter((item) =>
      columns.some((col) =>
        (item[col.id as keyof ReturnExchange]?.toString() || '')
          .toLowerCase()
          .includes(query),
      ),
    );
  }, [data, searchText]);

  const handleSearch = (query: string) => setSearchText(query);

  const handleDeleteClick = (itemId: string) => {
    setSelectedItemId(itemId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    setData(data.filter((item) => item.id !== selectedItemId));
    setIsDeleteConfirmationOpen(false);
    setSelectedItemId(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setSelectedItemId(null);
  };

  const renderRow = (item: ReturnExchange) => {
    const statusStyles = getStatusStyles(item.status);
    return (
      <TableRow key={item.id}>
        <TableData>{item.id}</TableData>
        <TableData>
          <Image $backgroundImage={item.photoUrl} />
          <DetailContainer>
            <PrimaryText>{item.name}</PrimaryText>
            <Category>{item.category}</Category>
          </DetailContainer>
        </TableData>
        <TableData>{`${item.amount.toLocaleString()} 원`}</TableData>
        <TableData>{`${item.quantity} 개`}</TableData>
        <TableData>{`${item.paymentAmount.toLocaleString()} 원`}</TableData>
        <TableData>{item.type}</TableData>
        <TableData>
          <StatusIndicator
            $color={statusStyles.color}
            $backgroundColor={statusStyles.backgroundColor}
          >
            {item.status}
          </StatusIndicator>
        </TableData>
        <TableData>
          <div
            onClick={() => handleDeleteClick(item.id)}
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
        <StyledTypography>취소 / 반품 / 교환 조회</StyledTypography>
        <Box
          sx={{
            width: '25ch',
            marginLeft: 1,
          }}
        >
          <SearchBox onSearch={handleSearch} styleProps={{ width: '100%' }} />
        </Box>
      </Box>
      <GenericTable<ReturnExchange>
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
    </Box>
  );
}

export default ReturnAndExchangePage;
