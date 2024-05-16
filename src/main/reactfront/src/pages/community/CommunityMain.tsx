import React from 'react';
import Board from '../../components/community/Board';

import { Container, Paper, Box } from '@mui/material';
import ButtonCategoryTag from '../../components/common/button/ButtonCategoryTag';

const CommunityMain = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Paper>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <ButtonCategoryTag onCategorySelect={handleCategorySelect} />
        </Box>
        <Board selectedCategory={selectedCategory} />
      </Container>
    </Paper>
  );
};

export default CommunityMain;
