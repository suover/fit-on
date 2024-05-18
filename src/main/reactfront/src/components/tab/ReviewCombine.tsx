import React from 'react';
import { reviewDataRaw } from '../../types/reviewData';
import { AccountCircle } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {
  BestReviewSection,
  ReviewContainer,
  ReviewHeader,
  Section,
  UserID,
  UserProfile,
  ReviewRating,
  ReviewDate,
  ReviewTitle,
  ReviewText,
  ImgContainer,
  ImgDiv,
  RightReviewContainer,
  ReviewRatingAndDateContainer,
} from './ReviewCombine.styles';

// 폰트
const theme = createTheme();
//반응형 폰트사이즈
theme.typography.h3 = {
  // 기본 폰트 크기
  fontSize: '0.9rem',
  // 너비가 600px 이상일 때 적용
  '@media (min-width:600px)': {
    fontSize: '0.9rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
};

type Review = {
  id: string;
  title: string;
  rating: number;
  text: string;
  date: string;
  images: string[];
};

const reviewData: Review[] = reviewDataRaw.map((review) => ({
  ...review,
  images: review.image || [], // 'image' 필드가 있으면 사용하고, 없으면 빈 배열 할당
}));
export const ReviewComponent: React.FC<{ review: Review }> = ({ review }) => {
  return (
    <div>
      <ReviewContainer>
        <ReviewHeader>
          <UserProfile>
            <AccountCircle style={{ fontSize: '70px' }} /> {/* 프로필 사진 */}
            <UserID>{review.id}</UserID>
          </UserProfile>

          <RightReviewContainer>
            <ReviewRatingAndDateContainer>
              <div className="review-rating">
                {'★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)}
              </div>
              <ReviewDate>{review.date}</ReviewDate>
            </ReviewRatingAndDateContainer>
            <ReviewTitle>{review.title}</ReviewTitle>
            <ReviewText>{review.text}</ReviewText>
            <ImgContainer>
              {review.images.map((image, index) => (
                <ImgDiv key={index}>
                  <img src={image} alt={`Review image ${index + 1}`} />
                </ImgDiv>
              ))}
            </ImgContainer>
          </RightReviewContainer>
        </ReviewHeader>
      </ReviewContainer>
    </div>
  );
};

export const ReviewCombine: React.FC = () => {
  return (
    <div className="app">
      <BestReviewSection>
        <section className="best-review-section">
          <ThemeProvider theme={theme}>
            <Typography variant="h3">BEST REVIEW</Typography>
          </ThemeProvider>
          {reviewData.length > 0 && <ReviewComponent review={reviewData[0]} />}
        </section>
      </BestReviewSection>
      <section className="all-reviews-section">
        <ThemeProvider theme={theme}>
          <Typography variant="h3">ALL REVIEW</Typography>
        </ThemeProvider>
        {reviewData.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
      </section>
      <Stack
        spacing={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '30px',
        }}
      >
        <Pagination count={5} variant="outlined" />
      </Stack>
    </div>
  );
};

export default ReviewCombine;
