import React, { useState, useMemo } from 'react';
import { Box, Tab, Tabs, IconButton, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericTable from '../../components/genericTable/GenericTable';
import {
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import SearchBox from '../../components/common/search/SearchBox';
import StyledTypography from '../../styles/mypage/StyledTypography';

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

const communityPosts: Post[] = Array.from({ length: 15 }, (_, index) => ({
  id: (index + 1).toString(),
  title: `커뮤니티 댓글 ${index + 1}`,
  views: Math.floor(Math.random() * 200) + 1,
  comments: Math.floor(Math.random() * 50) + 1,
  date: `2023-04-${String(index + 1).padStart(2, '0')}`,
}));

const routinePosts: Post[] = Array.from({ length: 15 }, (_, index) => ({
  id: (index + 1).toString(),
  title: `루틴 댓글 ${index + 1}`,
  views: Math.floor(Math.random() * 200) + 1,
  comments: Math.floor(Math.random() * 50) + 1,
  date: `2023-04-${String(index + 1).padStart(2, '0')}`,
}));

const columns = [
  { id: 'id', label: '번호', width: 50 },
  { id: 'title', label: '제목', width: 300 },
  { id: 'views', label: '조회수', width: 100 },
  { id: 'comments', label: '댓글수', width: 100 },
  { id: 'date', label: '작성일', width: 150 },
  { id: 'modifyDelete', label: '수정 / 삭제', width: 150 },
];

function CommentManagementPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const allPosts = currentTab === 0 ? communityPosts : routinePosts;

  const filteredPosts = useMemo(
    () =>
      allPosts.filter((post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [allPosts, searchText],
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
    setSelected({});
  };

  const handleSearch = (query: string) => {
    setSearchText(query);
  };

  const handleRowSelect = (id: string, isSelected: boolean) => {
    setSelected((prev) => ({ ...prev, [id]: isSelected }));
  };

  const renderRow = (
    post: Post,
    isSelected: boolean,
    onSelect: (id: string, isSelected: boolean) => void,
  ) => {
    return (
      <TableRow key={post.id}>
        <TableData>{post.id}</TableData>
        <TableData>{post.title}</TableData>
        <TableData>{post.views}</TableData>
        <TableData>{post.comments}</TableData>
        <TableData>{post.date}</TableData>
        <TableData>
          <IconButton
            onClick={() => alert(`글 ${post.id} 수정`)}
            sx={{
              cursor: 'pointer',
              color: 'rgba(0, 0, 0, 0.54)',
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => alert(`글 ${post.id} 삭제`)}
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
        <StyledTypographyWithWidth>댓글 관리</StyledTypographyWithWidth>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="커뮤니티 게시판" />
          <Tab label="루틴 게시판" />
        </Tabs>
        <Box sx={{ width: '25ch', marginLeft: 2 }}>
          <SearchBox onSearch={handleSearch} styleProps={{ width: '100%' }} />
        </Box>
      </Box>
      <GenericTable<Post>
        data={filteredPosts}
        columns={columns}
        includeCheckboxes={false}
        renderRow={(post) =>
          renderRow(post, !!selected[post.id], handleRowSelect)
        }
      />
    </Box>
  );
}

export default CommentManagementPage;
