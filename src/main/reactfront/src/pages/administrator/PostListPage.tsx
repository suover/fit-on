import React, { useState } from 'react';
import {
  Information,
  informations,
} from '../../types/administrator/InformationData';
import {
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import GenericTable from '../../components/genericTable/GenericTable';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Search } from '../../styles/administrator/PostListPage.styles';
import SearchBox from '../../components/common/search/SearchBox';
import GenericButton from '../../components/common/genericButton/GenericButton';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '../../components/icons/DeleteIcon';

const PostListPage: React.FC = () => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedInformationId, setSelectedInformationId] = useState<
    string | null
  >(null);

  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState<Information[]>(informations);

  const handleDeleteClick = (informationId: string) => {
    setSelectedInformationId(informationId);
    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
    setSelectedInformationId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedInformationId) {
      setFilteredInfo((prevItems) =>
        prevItems.filter(
          (information: Information) =>
            information.id !== selectedInformationId,
        ),
      );
    }
    setIsDeleteConfirmationOpen(false);
    setSelectedInformationId(null);
  };

  const handleSearch = (query: string) => {
    const filtered = informations.filter(
      (information) =>
        information.id.includes(query) ||
        information.title.includes(query) ||
        information.writer.includes(query) ||
        information.date.includes(query),
    );
    setFilteredInfo(filtered);
  };

  const columns = [
    { id: 'id', label: '번호', width: 30 },
    { id: 'title', label: '게시글 제목', width: 100 },
    { id: 'writer', label: '작성자', width: 50 },
    { id: 'date', label: '작성일', width: 50 },
    { id: 'view', label: '조회수', width: 50 },
    { id: 'like', label: '좋아요', width: 50 },
    { id: 'delete', label: '삭제', width: 30 },
  ];

  return (
    <>
      <Search>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Fit On 정보글목록
        </Typography>
        <SearchBox onSearch={handleSearch} />
      </Search>
      <GenericTable
        columns={columns}
        data={filteredInfo}
        renderRow={(information: Information) => (
          <TableRow key={information.id}>
            <TableData>{information.id}</TableData>
            <TableData>{information.title}</TableData>
            <TableData>{information.writer}</TableData>
            <TableData>{information.date}</TableData>
            <TableData>{information.view}</TableData>
            <TableData>{information.like}</TableData>
            <TableData>
              <div
                onClick={() => handleDeleteClick(information.id)}
                style={{ cursor: 'pointer' }}
              >
                <DeleteIcon />
              </div>
            </TableData>
          </TableRow>
        )}
        includeCheckboxes={false}
      />
      <Box sx={{ position: 'relative' }}>
        <GenericButton
          onClick={() => navigate('/post-register')}
          style={{ position: 'absolute', right: '0', top: '-35px' }}
        >
          게시글 등록
        </GenericButton>
      </Box>
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
    </>
  );
};

export default PostListPage;
