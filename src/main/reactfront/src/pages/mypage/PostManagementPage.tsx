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

const columns = [
  { id: 'id', label: '번호', width: 50 },
  { id: 'title', label: '제목', width: 300 },
  { id: 'views', label: '조회수', width: 100 },
  { id: 'comments', label: '댓글수', width: 100 },
  { id: 'date', label: '작성일', width: 150 },
  { id: 'modifyDelete', label: '수정 / 삭제', width: 150 },
];

const communityPosts: Post[] = Array.from({ length: 15 }, (_, index) => ({
  id: (index + 1).toString(),
  title: `커뮤니티 게시글 제목 ${index + 1}`,
  views: Math.floor(Math.random() * 100) + 1,
  comments: Math.floor(Math.random() * 20) + 1,
  date: `2023-04-${String(index + 1).padStart(2, '0')}`,
}));

const routinePosts: Post[] = Array.from({ length: 15 }, (_, index) => ({
  id: (index + 1).toString(),
  title: `루틴 게시글 제목 ${index + 1}`,
  views: Math.floor(Math.random() * 100) + 1,
  comments: Math.floor(Math.random() * 20) + 1,
  date: `2023-04-${String(index + 1).padStart(2, '0')}`,
}));

const dummyPost: Post[] = [
  {
    id: '1',
    title: '오늘 러닝 하신 분?',
    views: 7,
    comments: 1,
    date: '2024-05-29',
  },
  {
    id: '2',
    title: '헬스장 추천 좀 해드릴게요!',
    views: 12,
    comments: 7,
    date: '2024-05-28',
  },
  {
    id: '3',
    title: '러닝화 어떤게 좋아요?',
    views: 21,
    comments: 46,
    date: '2024-05-27',
  },
  {
    id: '4',
    title: '자전거 타기 좋은 장소 추천',
    views: 20,
    comments: 34,
    date: '2024-05-26',
  },
  {
    id: '5',
    title: '스쿼트 자세 꿀팁',
    views: 18,
    comments: 13,
    date: '2024-05-25',
  },
  {
    id: '6',
    title: '주말 등산 같이 가실 분?',
    views: 5,
    comments: 16,
    date: '2024-05-24',
  },
  {
    id: '7',
    title: '수영 배우기 어렵나요?',
    views: 12,
    comments: 35,
    date: '2024-05-23',
  },
  {
    id: '8',
    title: '홈트레이닝 효과 보신 분?',
    views: 25,
    comments: 49,
    date: '2024-05-22',
  },
  {
    id: '9',
    title: '단백질 파우더 맛있는걸로 추천 부탁드려요',
    views: 35,
    comments: 39,
    date: '2024-05-21',
  },
  {
    id: '10',
    title: '유산소 운동 진짜 좋네요',
    views: 17,
    comments: 3,
    date: '2024-05-20',
  },
  {
    id: '11',
    title: '스트레칭 자주 하시나요?',
    views: 11,
    comments: 1,
    date: '2024-05-19',
  },
  {
    id: '12',
    title: '운동 후에 뭐 드세요?',
    views: 20,
    comments: 5,
    date: '2024-05-18',
  },
];

const dummyRoutine: Post[] = [
  {
    id: '1',
    title: '일주일만에 넓은 어깨 가지자!',
    date: '2024-05-27',
    comments: 5,
    views: 17,
  },
  {
    id: '2',
    title: '3대와 함께하는 하체 운동',
    date: '2024-05-13',
    comments: 15,
    views: 22,
  },
  {
    id: '3',
    title: '전신 웨이트',
    date: '2024-05-10',
    comments: 17,
    views: 35,
  },
];

function PostManagementPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const allPosts = currentTab === 0 ? dummyPost : dummyRoutine;

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

  const renderRow = (post: Post) => {
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
        <StyledTypographyWithWidth>게시글 관리</StyledTypographyWithWidth>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label="커뮤니티 게시판" />
          <Tab label="루틴 게시판" />
        </Tabs>
        <Box
          sx={{
            width: '25ch',
            marginLeft: 2,
          }}
        >
          <SearchBox onSearch={handleSearch} styleProps={{ width: '100%' }} />
        </Box>
      </Box>
      <GenericTable<Post>
        data={filteredPosts}
        columns={columns}
        includeCheckboxes={false}
        renderRow={renderRow}
      />
    </Box>
  );
}

export default PostManagementPage;
