import React from 'react';

import { Container } from '@mui/material';
import PostDetail from '../../components/postDetail/PostDetail';

const dummyRoutine = {
  postId: 10,
  title: 'Meditation and Breathing Techniques',
  userId: 'user010',
  purpose: 'Promote relaxation and mental clarity',
  target: ['Mind'],
  level: 'All Levels',
  list: [],
  content:
    '마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.마음의 평화를 찾기 위한 명상과 마인드풀니스 기법을 배워보세요. 일상의 스트레스에서 벗어나 집중력과 평온함을 높일 수 있습니다.',
  category: 'Meditation',
  writtenTime: '2024-04-28',
  likes: 200,
  views: 2500,
  createAt: '2024-04-24',
  updateAt: '2024-04-24',
  comments: [],
  imageUrl:
    'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
};

const ViewRoutineDetail = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: '700px', padding: '50px 0 100px' }}
    >
      <PostDetail data={dummyRoutine} pageURL="routine" />
    </Container>
  );
};

export default ViewRoutineDetail;
