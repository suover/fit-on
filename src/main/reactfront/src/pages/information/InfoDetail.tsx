import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { InfoPost, comments } from '../../types/MainDummyData';
import {
  InfoWrapper,
  DetailTitle,
  Content,
} from '../../styles/information/InfoDetail.styles';
import CommentList from '../../components/common/comment/CommentList';

import { Container } from '@mui/material';

const dummyInfo: InfoPost = {
  id: 4,
  title: '심장 강화를 위한 유산소 운동',
  nickname: '정하나',
  content:
    '심장 건강을 향상시킬 수 있는 유산소 운동을 소개합니다. 간단한 단계를 따라하면서 건강을 관리하세요.',
  views: 410,
  likes: 35,
  imageUrl: 'https://example.com/images/cardio-workout.jpg',
};

const InfoDetail: React.FC = () => {
  const [info, setInfo] = useState<InfoPost>(dummyInfo);
  const { infoNum } = useParams<{ infoNum: string }>();

  console.log(infoNum);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const response = await fetch(`https://localHost:8080/info/${infoNum}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       const data = await response.json();
  //       setInfo(data);
  //     } catch (error) {
  //       console.error('Error fetching post:', error);
  //     }
  //   };

  //   fetchPost();
  // }, [infoNum]);

  return (
    <InfoWrapper>
      <Container>
        <DetailTitle>
          <h2>{info.title}</h2>
          <p>
            <span>{info.nickname}</span>
            <span>조회수 0000</span>
            <span>작성일 0000-00-00</span>
          </p>
        </DetailTitle>
        <Content>{info.content}</Content>
      </Container>
      <Container sx={{ padding: '20px 0' }}>
        <CommentList comments={comments} />
      </Container>
    </InfoWrapper>
  );
};

export default InfoDetail;
