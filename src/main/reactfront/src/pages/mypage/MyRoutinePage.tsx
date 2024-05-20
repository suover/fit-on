import React from 'react';
import { Box, Paper, Container, Button } from '@mui/material';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';

const ButtonGroup = styled.div`
  margin-top: 55px;
  background-color: white;
  border-bottom: 1px solid black;
  overflow: hidden;
`;

function MyRoutinePage() {
  return (
    <>
      <ButtonGroup>
        <Link to="my-routines">
          <Button sx={{ color: 'black', fontSize: '1rem' }}>나의 루틴</Button>
        </Link>
        <Link to="shared-routine">
          |
          <Button sx={{ color: 'black', fontSize: '1rem' }}>
            공유받은 루틴
          </Button>
        </Link>
      </ButtonGroup>
      <Paper sx={{ mb: 4 }}>
        <Container>
          <Box sx={{ mt: 4, mb: 4, backgroundColor: '#f5f5f5' }}>
            <Outlet />
          </Box>
        </Container>
      </Paper>
    </>
  );
}

export default MyRoutinePage;
