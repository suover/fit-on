import React from 'react';
import Board from '../../components/community/Board';

import { Container, Box } from '@mui/material';
import ButtonCategoryTag from '../../components/common/button/ButtonCategoryTag';
import { useNavigate } from 'react-router-dom';

// const CommunityMain = () => {
//   const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
//     null,
//   );

const CommunityMain: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<
    string | number | null
  >(null);
  const navigate = useNavigate();

  // const handleCategorySelect = (category: number) => {
  const handleCategorySelect = (categoryName: string | number) => {
    if (categoryName === '인기글') {
      navigate('/community/popular'); // 인기글 페이지로 이동
    } else {
      setSelectedCategory(categoryName);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '20px' }}>
      <Box sx={{ mt: 4 }}>
        <ButtonCategoryTag onCategorySelect={handleCategorySelect} />
      </Box>
      <Board selectedCategory={selectedCategory} />
    </Container>
  );
};

export default CommunityMain;
