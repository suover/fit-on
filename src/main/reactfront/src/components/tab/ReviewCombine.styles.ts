import styled from 'styled-components';
const BestReviewSection = styled.section`
  margin-bottom: 70px;
`;
const ReviewContainer = styled.div`
  padding: 10px;
  margin-bottom: 5px;
  border-top: 1px solid #ccc; // 상단에만 경계선
  border-bottom: 1px solid #ccc; // 하단에만 경계선
  background-color: transparent;
  width: 100%;
`;
const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 95%;
`;
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 2; /* 20%의 공간을 차지 */
  // width: 200px;
`;
const UserID = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
`;

const RightReviewContainer = styled.div`
  flex-direction: column;
  display: flex;
  // width: 100%;
  flex: 8;
  gap: 8px;
`;
const ReviewRatingAndDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const ReviewTitle = styled.h3`
  color: #333;
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
`;
const ReviewText = styled.p`
  color: black;
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 13px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;
const UserContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

const ReviewRating = styled.div`
  /* 별점 스타일 */
  font-size: 2rem;
`;

const ReviewDate = styled.span`
  font-size: 0.8rem;
  color: #666;
  font-family: 'Noto Sans KR', sans-serif;
`;
const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const ImgDiv = styled.div`
  flex: 0 0 100px; // flex-grow, flex-shrink, flex-basis 설정
  margin-right: 10px;
  &:last-child {
    margin-right: 0; // 마지막 요소 마진 제거
  }
  width: 100px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 이미지 비율을 유지하면서 ImgDiv에 맞춰 조정
  }
`;
const StyledTitle = styled.h2`
  font-family: 'Noto Sans KR', 'Raleway', sans-serif;
  font-size: 1.4rem;
`;
const TopContainver = styled.div`
  justify-content: space-between;
`;
const BottomCont = styled.div`
  align-items: center;
`;

export {
  BestReviewSection,
  ReviewContainer,
  ReviewHeader,
  Section,
  UserID,
  UserProfile,
  UserContainer,
  TopContainver,
  ReviewRating,
  ReviewDate,
  ReviewTitle,
  ReviewText,
  ImgContainer,
  ImgDiv,
  StyledTitle,
  BottomCont,
  RightReviewContainer,
  ReviewRatingAndDateContainer,
};
