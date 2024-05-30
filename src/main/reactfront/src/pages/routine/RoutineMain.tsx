import React, { useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import RoutineBestList from '../../components/routine/RoutineBestList';
import ButtonNewRoutine from '../../components/common/button/ButtonNewRoutine';
import RoutineTotalList from '../../components/routine/RoutineTotalList';
import SearchBox from '../../components/common/search/SearchBox';

const RoutineMain = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <Container
      sx={{
        padding: '50px 0 100px',
        position: 'relative',
        minHeight: '800px ',
      }}
    >
      <Box sx={{ marginBottom: '50px' }}>
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: '1.875rem', marginBottom: '5px' }}
        >
          베스트 루틴
        </Typography>
        <RoutineBestList />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: '1.875rem', marginBottom: '10px' }}
        >
          루틴
        </Typography>
        <SearchBox onSearch={handleSearch} styleProps={{ width: '200px' }} />
      </Box>
      <Box>
        <RoutineTotalList searchQuery={searchQuery} />
      </Box>
      <Box sx={{ position: 'absolute', right: '25px', bottom: '100px' }}>
        <ButtonNewRoutine />
      </Box>
    </Container>
  );
};

export default RoutineMain;
