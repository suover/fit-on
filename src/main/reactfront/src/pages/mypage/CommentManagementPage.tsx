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

const dummyComment: Post[] = [
  {
    id: '1',
    title: '진짜 재밌어 보여요!',
    views: 1,
    comments: 2,
    date: '2024-05-27',
  },
  {
    id: '2',
    title: '좋은 글 감사합니다.',
    views: 4,
    comments: 0,
    date: '2024-05-25',
  },
  {
    id: '3',
    title: '많은 도움이 되었어요.',
    views: 5,
    comments: 1,
    date: '2024-05-22',
  },
  {
    id: '4',
    title: '이 글 덕분에 목표를 달성했어요!',
    views: 9,
    comments: 4,
    date: '2024-05-21',
  },
  {
    id: '5',
    title: '좋은 정보 감사합니다!',
    views: 11,
    comments: 1,
    date: '2024-05-23',
  },
  {
    id: '6',
    title: '추가로 산책가기도 좋을것 같네요!',
    views: 17,
    comments: 4,
    date: '2024-05-23',
  },
  {
    id: '7',
    title: '같이 운동해요!',
    views: 21,
    comments: 5,
    date: '2024-05-11',
  },
  {
    id: '8',
    title: '한번 시도해볼게요.',
    views: 23,
    comments: 4,
    date: '2024-05-07',
  },
  {
    id: '9',
    title: '정말 도움 되는 글이에요.',
    views: 26,
    comments: 1,
    date: '2024-05-03',
  },
  {
    id: '10',
    title: '여기 추천합니다!',
    views: 28,
    comments: 9,
    date: '2024-05-03',
  },
  {
    id: '11',
    title: '저도 같은 생각입니다.',
    views: 31,
    comments: 6,
    date: '2024-05-14',
  },
  {
    id: '12',
    title: '잘 읽었습니다.',
    views: 32,
    comments: 0,
    date: '2024-05-10',
  },
  {
    id: '13',
    title: '정말 유익한 글이네요.',
    views: 39,
    comments: 3,
    date: '2024-05-02',
  },
];

const dummyRoutineComment: Post[] = [
  {
    id: '1',
    title: '루틴 공유해주셔서 감사합니다!',
    views: 2,
    comments: 9,
    date: '2024-05-28',
  },
  {
    id: '2',
    title: '저도 이 루틴 따라해볼게요.',
    views: 7,
    comments: 2,
    date: '2024-05-27',
  },
  {
    id: '3',
    title: '몇 세트씩 하나요?',
    views: 12,
    comments: 7,
    date: '2024-05-27',
  },
  {
    id: '4',
    title: '이 루틴에 추가할 운동 추천해주실 수 있나요?',
    views: 13,
    comments: 7,
    date: '2024-05-23',
  },
  {
    id: '5',
    title: '제가 해본 루틴 중에 최고에요.',
    views: 16,
    comments: 9,
    date: '2024-05-22',
  },
  {
    id: '6',
    title: '운동 시간은 얼마나 걸리나요?',
    views: 18,
    comments: 0,
    date: '2024-05-22',
  },
  {
    id: '7',
    title: '다이어트에도 도움이 될까요?',
    views: 22,
    comments: 7,
    date: '2024-05-22',
  },
  {
    id: '8',
    title: '이 루틴을 몇 주 동안 했나요?',
    views: 24,
    comments: 8,
    date: '2024-05-12',
  },
  {
    id: '9',
    title: '초보자가 따라하기엔 어려울까요?',
    views: 28,
    comments: 9,
    date: '2024-05-10',
  },
  {
    id: '10',
    title: '이 루틴 정말 좋아 보이네요!',
    views: 32,
    comments: 3,
    date: '2024-05-06',
  },
  {
    id: '11',
    title: '이 루틴 따라하면서 조언해주실 점 있을까요?',
    views: 32,
    comments: 8,
    date: '2024-05-04',
  },
  {
    id: '12',
    title: '효과는 어느 정도 보셨나요?',
    views: 35,
    comments: 2,
    date: '2024-05-03',
  },
  {
    id: '13',
    title: '근력 향상에 좋을 것 같아요.',
    views: 38,
    comments: 3,
    date: '2024-05-02',
  },
];

function CommentManagementPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  const allPosts = currentTab === 0 ? dummyComment : dummyRoutineComment;

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
        renderRow={(post) =>
          renderRow(post, !!selected[post.id], handleRowSelect)
        }
      />
    </Box>
  );
}

export default CommentManagementPage;
