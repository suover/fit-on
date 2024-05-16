import React from 'react';

import { Container, Paper } from '@mui/material';

import ViewPost from '../../components/community/ViewPost';

const ViewPostDetail = () => {
  return (
    <Paper>
      <Container maxWidth="lg">
        <ViewPost />
      </Container>
    </Paper>
  );
};

export default ViewPostDetail;
