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
  const [data, setData] = useState<ReturnExchange[]>([]);
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
