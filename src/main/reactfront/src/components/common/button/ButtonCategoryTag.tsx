import React, { useState, useEffect } from 'react';
import axios from '../../../api/axiosConfig';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

//카테고리 타입
type Category = {
  no: number; //댓글 분류번호
  name: string;
  categoryId: number;
};
function createCategoryData(
  no: number,
  name: string,
  categoryId: number,
): Category {
  return {
    no,
    name,
    categoryId,
  };
}
//카테고리 리스트
const exampleCategory: Category[] = [
  createCategoryData(1, '인기글', 1),
  createCategoryData(2, '식단', 2),
  createCategoryData(3, '보충제', 3),
  createCategoryData(4, '닭가슴살', 4),
  createCategoryData(5, '이슈', 5),
  createCategoryData(6, '상체운동', 6),
  createCategoryData(7, '하체운동', 7),
  createCategoryData(8, '전신운동', 8),
  createCategoryData(9, '맨몸운동', 9),
  createCategoryData(10, '유산소', 10),
  createCategoryData(11, '재활운동', 11),
  createCategoryData(12, '스트레칭', 12),
  createCategoryData(13, '건강', 13),
  createCategoryData(14, '운동완료', 14),
];

// 카테고리 스타일
const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  borderRadius: '4px',
  textAlign: 'center',
  cursor: 'pointer',
}));

type Post = {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  viewCount: number;
};

type ButtonCategoryTagProps = {
  onCategorySelect: (category: number) => void;
};

const ButtonCategoryTag: React.FC<ButtonCategoryTagProps> = ({
  onCategorySelect,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async (categoryId: number | null) => {
    try {
      const response =
        categoryId === 14 // '인기글'의 categoryId가 14로 가정
          ? await axios.get('/posts/popular')
          : await axios.get('/posts', { params: { categoryId } });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts(selectedCategoryId);
  }, [selectedCategoryId]);

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    onCategorySelect(categoryId); // 상위 컴포넌트에 선택된 카테고리를 전달
  };

  return (
    <Box sx={{ flexGrow: 1, marginBottom: '80px' }}>
      <Typography
        variant="h2"
        sx={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}
      >
        카테고리
      </Typography>
      <Grid
        container
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 14 }}
      >
        {exampleCategory.map((category) => (
          <Grid xs={2} sm={2} key={category.no}>
            <Item onClick={() => handleCategoryClick(category.categoryId)}>
              #{category.name}
              <br />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ButtonCategoryTag;
