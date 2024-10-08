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
  nickname?: string;
  views?: number;
  shares?: number;
  likes: number;
  imageUrl: string;
  routineParts?: string | string[];
};

interface CardListsProps<T> {
  contents: T[];
  pageURL: string;
  Icon?: React.ElementType<SvgIconProps>;
  keyword?: string;
  search?: string;
  page?: number;
}

const CardLists = <T extends ContentsType>({
  contents,
  pageURL,
  Icon,
  keyword,
  search,
  page,
}: CardListsProps<T>) => {
  let additionalUrl: string = '';

  if (keyword !== undefined) {
    additionalUrl = `keyword=${keyword}&search=${search}&page=${page}`;
  }

  return (
    <>
      <Grid2
        container
        rowSpacing={3}
        columnSpacing={{ xs: 1, sm: 2, md: 6.3 }}
        sx={{ marginBottom: '30px' }}
      >
        {contents.map((content) => (
          <Grid2 key={content.id}>
            <Link
              to={
                keyword === undefined
                  ? `/${pageURL}/${content.id}`
                  : `/${pageURL}/${content.id}?${additionalUrl}`
              }
            >
              <ContentCard content={content} Icon={Icon} boardType={pageURL} />
            </Link>
          </Grid2>
        ))}
      </Grid2>
      <Stack
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        {/* <Pagination count={5} variant="outlined" /> */}
      </Stack>
    </>
  );
};

export default CardLists;
