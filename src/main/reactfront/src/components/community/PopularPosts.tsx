import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import SearchBox from '../common/search/SearchBox';
import GenericTable from '../genericTable/GenericTable';
import { TableData, TableRow } from '../genericTable/GenericTable.styles';
import ButtonNewPost from '../common/button/ButtonNewPost';
import axios from '../../api/axiosConfig';

const PopularPosts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const fetchPopularPosts = async () => {
    try {
      const response = await axios.get('/api/community/posts/popular', {
        params: { limit: 10 },
      });

      console.log('Fetched data:', response.data); // 응답 데이터 확인

      const transformedData = response.data.map((post: any) => ({
        ...post,
        id: post.communityId.toString(), // GenericTable 형식 이슈로 id를 communityId로 설정
        categoryName: post.categoryName,
        nickname: post.nickname,
        createdAt: new Date(post.createdAt),
        viewCount: post.viewCount,
      }));

      console.log('Transformed data:', transformedData); // 변환된 데이터 확인

      setPosts(transformedData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPopularPosts();
  }, []);

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, posts]);

  const handleRowClick = (id: string) => {
    navigate(`/community/${id}`);
  };

  const columns = [
    { id: 'title', label: '제목', width: 200 },
    { id: 'categoryName', label: '카테고리', width: 40 },
    { id: 'nickname', label: '닉네임', width: 40 },
    { id: 'createdAt', label: '작성일', width: 40 },
    { id: 'viewCount', label: '조회수', width: 30 },
  ];

  const renderRow = (
    post: Post,
    isSelected: boolean,
    onSelect: (id: string, isSelected: boolean) => void,
  ) => (
    <TableRow key={post.id} onClick={() => onSelect(post.id, isSelected)}>
      <TableData
        style={{
          paddingLeft: '20px',
          paddingRight: '20px',
          textAlign: 'left',
          width: 200,
        }}
      >
        {post.title}
      </TableData>
      <TableData style={{ textAlign: 'center', width: 50 }}>
        {post.categoryName}
      </TableData>
      <TableData style={{ textAlign: 'center', width: 40 }}>
        {post.nickname}
      </TableData>
      <TableData style={{ textAlign: 'center', width: 30 }}>
        {post.createdAt.toLocaleDateString()}
      </TableData>
      <TableData style={{ textAlign: 'center', width: 30 }}>
        {post.viewCount}
      </TableData>
    </TableRow>
  );

  return (
    <Box sx={{ paddingBottom: '100px', position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '15px',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '10px',
            lineHeight: '0',
          }}
        >
          인기글
        </Typography>
        <SearchBox onSearch={setSearchTerm} styleProps={{ width: '300px' }} />
      </Box>
      <GenericTable<Post>
        data={filteredPosts}
        columns={columns}
        rowsPerPage={20}
        renderRow={(item, isSelected) =>
          renderRow(item, isSelected, handleRowClick)
        }
      />
      <Box sx={{ position: 'absolute', right: '0', bottom: '100px' }}>
        <ButtonNewPost />
      </Box>
    </Box>
  );
};

export default PopularPosts;

type Post = {
  id: string;
  communityId: string;
  userId: string;
  title: string;
  nickname: string;
  content: string;
  categoryId: number;
  categoryName: string;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  like: number;
  comments: Comment[];
};
