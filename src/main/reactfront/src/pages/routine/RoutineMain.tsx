import React, { useState, useEffect, useContext } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import RoutineBestList from '../../components/routine/RoutineBestList';
import ButtonNewRoutine from '../../components/common/button/ButtonNewRoutine';
import RoutineTotalList from '../../components/routine/RoutineTotalList';
import SearchBox from '../../components/common/search/SearchBox';
import AuthContext from '../../context/AuthContext';

const RoutineMain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 변수 추가

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, [searchQuery]);

  return (
    <Container sx={{ padding: '50px 0 100px', position: 'relative' }}>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
          <Typography variant="h6" component="p" sx={{ marginTop: '20px' }}>
            루틴 목록을 불러오는 중입니다.
          </Typography>
        </Box>
      ) : (
        <>
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
            <SearchBox
              onSearch={handleSearch}
              styleProps={{ width: '200px' }}
            />
          </Box>
          <Box>
            <RoutineTotalList searchQuery={searchQuery} />
          </Box>
          <Box sx={{ position: 'absolute', right: '25px', bottom: '100px' }}>
            <ButtonNewRoutine />
          </Box>
        </>
      )}
    </Container>
  );
};

export default RoutineMain;
