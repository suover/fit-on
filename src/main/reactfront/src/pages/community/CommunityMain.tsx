import React from 'react';
import Board from '../../components/community/Board';

import { Container, Box } from '@mui/material';
import ButtonCategoryTag from '../../components/common/button/ButtonCategoryTag';

const CommunityMain = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<number | null>(
    null,
  );

  const handleCategorySelect = (category: number) => {
    setSelectedCategory(category);
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
