import React from 'react';
import { Link } from 'react-router-dom';

import ContentCard from '../contentCard/ContentCard';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { SvgIconProps } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type ContentsType = {
  id: number | string;
  title: string;
  author?: string;
  views?: number;
  likes: number;
  imageUrl: string;
  target?: string | string[];
};

interface CardListsProps<T> {
  contents: T[];
  pageURL: string;
  Icon?: React.ElementType<SvgIconProps>;
}

const CardLists = <T extends ContentsType>({
  contents,
  pageURL,
  Icon,
}: CardListsProps<T>) => {
  return (
    <>
      <Grid2
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 6.3 }}
        sx={{ marginBottom: '80px' }}
      >
        {contents.map((content) => (
          <Grid2 key={content.id}>
            <Link to={`/${pageURL}/${content.id}`}>
              <ContentCard content={content} Icon={Icon} />
            </Link>
          </Grid2>
        ))}
      </Grid2>
      <Stack
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Pagination count={5} variant="outlined" />
      </Stack>
    </>
  );
};

export default CardLists;
