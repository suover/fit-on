import React from 'react';
import { Box, Container, Button } from '@mui/material';
import styled from 'styled-components';
import { Link, Outlet, useLocation } from 'react-router-dom';
import GenericButton from '../../components/common/genericButton/GenericButton';

const ButtonGroup = styled.div`
  margin-top: 35px;
  background-color: white;
  border-bottom: 1px solid black;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 10px;

  a {
    text-decoration: none;
  }

  & > *:not(:last-child) {
    margin-right: 10px;
  }
`;

const MyRoutinePage: React.FC = () => {
  const location = useLocation();
  const isMyRoutinesPage =
    location.pathname === '/mypage/my-routine/my-routines';

  return (
    <>
      <ButtonGroup>
        <Link to="my-routines">
          <Button sx={{ color: 'black', fontSize: '1rem' }}>나의 루틴</Button>
        </Link>
        <Link to="shared-routine">
          <Button sx={{ color: 'black', fontSize: '1rem' }}>
            공유받은 루틴
          </Button>
        </Link>
        {isMyRoutinesPage && (
          <Link to="/new-routine" style={{ marginLeft: 'auto' }}>
            <GenericButton>루틴 작성</GenericButton>
          </Link>
        )}
      </ButtonGroup>
      <Outlet />
    </>
  );
};

export default MyRoutinePage;
