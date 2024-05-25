import React, { useState } from 'react';
import {
  Image,
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import GenericTable from '../../components/genericTable/GenericTable';
import { Review, reviews } from '../../types/administrator/ReviewData';
import { Search } from '../../styles/administrator/ReviewListPage.styles';
import { Typography, Box } from '@mui/material';
import SearchBox from '../../components/common/search/SearchBox';

const ReviewListPage = () => {
  const [filteredReviews, setFilteredReviews] = useState<Review[]>(reviews);

  const handleSearch = (query: string) => {
    const filtered = reviews.filter(
      (review) =>
        review.id.includes(query) ||
        review.productName.includes(query) ||
        review.category.includes(query) ||
        review.reviewer.includes(query),
    );
    setFilteredReviews(filtered);
  };
  const columns = [
    { id: 'id', label: '번호', width: 30 },
    { id: 'productName', label: '상품명', width: 100 },
    { id: 'category', label: '카테고리', width: 30 },
    { id: 'reviewer', label: '리뷰', width: 100 },
    { id: 'review', label: '닉네임', width: 30 },
    { id: 'rate', label: '평점', width: 30 },
  ];
  return (
    <Box sx={{ minHeight: '600px' }}>
      <Search>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Fit On 리뷰목록
        </Typography>
        <SearchBox onSearch={handleSearch} />
      </Search>
      <GenericTable
        columns={columns}
        data={filteredReviews}
        renderRow={(review: Review) => (
          <TableRow key={review.id}>
            <TableData>{review.id}</TableData>
            <TableData>
              <Image $backgroundImage={review.imageUrl} />
              {review.productName}
            </TableData>
            <TableData>{review.category}</TableData>
            <TableData>{review.review}</TableData>
            <TableData>{review.reviewer}</TableData>
            <TableData>{review.rate} / 5</TableData>
          </TableRow>
        )}
        includeCheckboxes={false}
      />
    </Box>
  );
};

export default ReviewListPage;
