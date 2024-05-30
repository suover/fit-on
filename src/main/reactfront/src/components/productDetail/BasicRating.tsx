import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function HalfRating() {
  return (
    <Stack spacing={1}>
      {/* 값을 매길 경우
      <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}

      {/* read only */}
      <Rating
        name="size-small"
        size="small"
        defaultValue={4}
        precision={1.5}
        readOnly
      />
    </Stack>
  );
}
