import React, { useState } from 'react';
import Box from '@mui/system/Box';
import Grid from '@mui/system/Unstable_Grid';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';

//카테고리 타입
type Category = {
  no: number; //댓글 분류번호
  name: string;
  cnt: number; //카테고리에 해당하는 글 개수
};
function createCategoryData(no: number, name: string, cnt: number): Category {
  return {
    no,
    name,
    cnt,
  };
}
//더미 카테고리 리스트
const exampleCategory: Category[] = [
  createCategoryData(1, '베스트', 100),
  createCategoryData(2, '운동완료', 100),
  createCategoryData(3, '식단', 100),
  createCategoryData(4, '보충제', 100),
  createCategoryData(5, '닭가슴살', 100),
  createCategoryData(6, '상체운동', 100),
  createCategoryData(7, '하체운동', 100),
  createCategoryData(8, '전신운동', 100),
  createCategoryData(9, '맨몸운동', 100),
  createCategoryData(10, '유산소', 100),
  createCategoryData(11, '재활운동', 100),
  createCategoryData(12, '스트레칭', 100),
  createCategoryData(13, '건강', 100),
  createCategoryData(14, '이슈', 100),
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

type ButtonCategoryTagProps = {
  onCategorySelect: (category: string) => void;
};

const ButtonCategoryTag: React.FC<ButtonCategoryTagProps> = ({
  onCategorySelect,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category); // 클릭된 카테고리로 상태 업데이트
    onCategorySelect(category); // 상위 컴포넌트에 선택된 카테고리를 전달
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5">인기 카테고리</Typography>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {exampleCategory.map((category) => (
          <Grid xs={2} sm={2} key={category.no}>
            <Item onClick={() => handleCategoryClick(category.name)}>
              #{category.name}
              <br />({category.cnt})
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ButtonCategoryTag;
