import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Tab,
  Tabs,
  IconButton,
  styled,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { useNavigate, useLocation } from 'react-router-dom';
import GenericTable from '../../components/genericTable/GenericTable';
import {
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import SearchBox from '../../components/common/search/SearchBox';
import StyledTypography from '../../styles/mypage/StyledTypography';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';

interface Comment {
  id: string;
  postId: string;
  postTitle: string;
  content: string;
  date: string;
  parentId: string | null;
}

const StyledTypographyWithWidth = styled(StyledTypography)({
  width: '200px',
});

const columns = [
  { id: 'postId', label: '글 번호', width: 50 },
  { id: 'postTitle', label: '글 제목', width: 300 },
  { id: 'content', label: '내용', width: 300 },
  { id: 'date', label: '작성일', width: 130 },
  { id: 'modifyDelete', label: '삭제', width: 30 },
];

function CommentManagementPage() {
  const [currentTab, setCurrentTab] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const savedPage = parseInt(params.get('page') || '0', 10);
    const savedTab = parseInt(params.get('tab') || '0', 10);
    setPage(savedPage);
    setCurrentTab(savedTab);
  }, [location.search]);

  useEffect(() => {
    if (userId !== null && currentTab !== null) {
      fetchComments();
    }
  }, [currentTab, userId, searchText, page, pageSize]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `/api/mypage/comment-management/comments?type=${currentTab === 0 ? 'community' : currentTab === 1 ? 'routine' : 'info'}&userId=${userId}&query=${searchText}&page=${page}&size=${pageSize}`,
      );
      setComments(response.data.content);
      setTotalComments(response.data.totalElements);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    setPage(0);
    navigate({
      pathname: location.pathname,
      search: `?tab=${newValue}&page=0`,
    });
  };

  const handleSearch = (query: string) => {
    setSearchText(query);
    setPage(0);
    navigate({
      pathname: location.pathname,
      search: `?tab=${currentTab}&page=0`,
    });
  };

  const handleDeleteClick = (comment: Comment) => {
    setSelectedComment(comment);
  };

  const handleConfirmDelete = async () => {
    if (selectedComment) {
      try {
        let deleteUrl = '';
        if (currentTab === 0) {
          deleteUrl = `/api/community/${selectedComment.postId}/${selectedComment.id}/delete`;
        } else if (currentTab === 1) {
          deleteUrl = `/api/routine/${selectedComment.postId}/${selectedComment.id}/delete`;
        } else {
          deleteUrl = `/api/info/${selectedComment.postId}/${selectedComment.id}/delete`;
        }

        await axios.put(deleteUrl);
        alert('댓글이 삭제되었습니다.');
        setSelectedComment(null);
        fetchComments();
      } catch (error) {
        console.error('Failed to delete comment:', error);
        alert('댓글 삭제에 실패했습니다.');
      }
    }
  };

  const handleCancelDelete = () => {
    setSelectedComment(null);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage - 1);
    navigate({
      pathname: location.pathname,
      search: `?tab=${currentTab}&page=${newPage - 1}`,
    });
  };

  const handleRowClick = (comment: Comment) => {
    const baseUrl =
      currentTab === 0 ? '/community' : currentTab === 1 ? '/routine' : '/info';
    navigate(`${baseUrl}/${comment.postId}?tab=${currentTab}&page=${page}`);
  };

  const renderRow = (comment: Comment) => {
    const isReply = comment.parentId !== null;
    return (
      <TableRow
        key={comment.id}
        onClick={() => handleRowClick(comment)}
        style={{ cursor: 'pointer', paddingLeft: isReply ? '20px' : '0px' }}
      >
        <TableData>{comment.postId}</TableData>
        <TableData>{comment.postTitle}</TableData>
        <TableData>
          {isReply && <SubdirectoryArrowRightIcon fontSize="small" />}{' '}
          {comment.content}
        </TableData>
        <TableData>{comment.date}</TableData>
        <TableData>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(comment);
            }}
            style={{ cursor: 'pointer', color: 'rgba(0, 0, 0, 0.54)' }}
          >
            <DeleteIcon />
          </IconButton>
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
        <StyledTypographyWithWidth>댓글 관리</StyledTypographyWithWidth>
        {currentTab !== null && (
          <Tabs value={currentTab} onChange={handleTabChange} centered>
            <Tab label="커뮤니티 게시판" />
            <Tab label="루틴 게시판" />
            <Tab label="정보 게시판" />
          </Tabs>
        )}
        <Box
          sx={{
            width: '25ch',
            marginLeft: 2,
          }}
        >
          <SearchBox onSearch={handleSearch} styleProps={{ width: '100%' }} />
        </Box>
      </Box>
      {currentTab !== null && (
        <>
          <GenericTable<Comment>
            data={comments}
            columns={columns}
            includeCheckboxes={false}
            renderRow={renderRow}
          />
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Pagination
              count={Math.ceil(totalComments / pageSize)}
              page={page + 1}
              onChange={handlePageChange}
              sx={{ marginTop: 2 }}
            />
          </Box>
        </>
      )}
      <Dialog open={Boolean(selectedComment)} onClose={handleCancelDelete}>
        <DialogTitle>댓글 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>정말 댓글을 삭제하시겠습니까?</DialogContentText>
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

export default CommentManagementPage;
