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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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

interface Post {
  id: string;
  title: string;
  views: number;
  comments: number;
  date: string;
}

const StyledTypographyWithWidth = styled(StyledTypography)({
  width: '200px',
});

const columns = [
  { id: 'id', label: '글 번호', width: 50 },
  { id: 'title', label: '제목', width: 500 },
  { id: 'views', label: '조회수', width: 50 },
  { id: 'comments', label: '댓글수', width: 50 },
  { id: 'date', label: '작성일', width: 130 },
  { id: 'modifyDelete', label: '수정 / 삭제', width: 80 },
];

function PostManagementPage() {
  const [currentTab, setCurrentTab] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState(10); // 페이지 크기
  const [totalPosts, setTotalPosts] = useState(0); // 총 게시글 수

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const savedPage = parseInt(params.get('page') || '0', 10);
    const savedTab = parseInt(params.get('tab') || '0', 10);
    setPage(savedPage);
    setCurrentTab(savedTab);
  }, [location.search]);

  useEffect(() => {
    if (userId !== null && currentTab !== null) {
      fetchPosts();
    }
  }, [currentTab, userId, searchText, page, pageSize]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `/api/mypage/post-management/posts?type=${currentTab === 0 ? 'community' : 'routine'}&userId=${userId}&query=${searchText}&page=${page}&size=${pageSize}`,
      );
      setPosts(response.data.content);
      setTotalPosts(response.data.totalElements); // 총 게시글 수 설정
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    setPage(0); // 탭 변경 시 페이지 초기화
    navigate({
      pathname: location.pathname,
      search: `?tab=${newValue}&page=0`,
    });
  };

  const handleSearch = (query: string) => {
    setSearchText(query);
    setPage(0); // 검색 시 페이지 초기화
    navigate({
      pathname: location.pathname,
      search: `?tab=${currentTab}&page=0`,
    });
  };

  const handleRowClick = (post: Post) => {
    const postType = currentTab === 0 ? 'community' : 'routine';
    navigate(`/${postType}/${post.id}?tab=${currentTab}&page=${page}`);
  };

  const handleEditClick = (post: Post) => {
    const postType = 'community';
    navigate(`/${postType}/edit/${post.id}?tab=${currentTab}&page=${page}`);
  };

  const handleDeleteClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleConfirmDelete = async () => {
    if (selectedPost) {
      try {
        await axios.put(`/api/community/posts/${selectedPost.id}/delete`, {
          isDeleted: true,
        });
        alert('게시글이 삭제되었습니다.');
        setSelectedPost(null);
        fetchPosts(); // 게시글 목록을 다시 불러옵니다.
      } catch (error) {
        console.error('Failed to delete post:', error);
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  const handleCancelDelete = () => {
    setSelectedPost(null);
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

  const renderRow = (post: Post) => {
    return (
      <TableRow
        key={post.id}
        onClick={() => handleRowClick(post)}
        style={{ cursor: 'pointer' }}
      >
        <TableData>{post.id}</TableData>
        <TableData>{post.title}</TableData>
        <TableData>{post.views}</TableData>
        <TableData>{post.comments}</TableData>
        <TableData>{post.date}</TableData>
        <TableData>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(post);
            }}
            sx={{
              cursor: 'pointer',
              color: 'rgba(0, 0, 0, 0.54)',
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(post);
            }}
            sx={{ cursor: 'pointer', color: 'rgba(0, 0, 0, 0.54)' }}
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
        <StyledTypographyWithWidth>게시글 관리</StyledTypographyWithWidth>
        {currentTab !== null && (
          <Tabs value={currentTab} onChange={handleTabChange} centered>
            <Tab label="커뮤니티 게시판" />
            <Tab label="루틴 게시판" />
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
          <GenericTable<Post>
            data={posts}
            columns={columns}
            includeCheckboxes={false}
            renderRow={renderRow}
          />
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Pagination
              count={Math.ceil(totalPosts / pageSize)}
              page={page + 1}
              onChange={handlePageChange}
              sx={{ marginTop: 2 }}
            />
          </Box>
        </>
      )}
      <Dialog open={Boolean(selectedPost)} onClose={handleCancelDelete}>
        <DialogTitle>게시글 삭제</DialogTitle>
        <DialogContent>
          <DialogContentText>정말 게시글을 삭제하시겠습니까?</DialogContentText>
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

export default PostManagementPage;
