import React from 'react';
import { Typography } from '@mui/material';
import CardLists from '../../components/cardList/CardList';
import img1 from '../../assets/img1.jpg';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';

const myRoutineDummy = [
  {
    id: 1,
    title: '일주일만에 넓은 어깨 가지자!',
    userId: 'user001',
    purpose: 'Increase morning energy',
    routineParts: ['어깨', ' 등'],
    level: 'Beginner',
    list: [],
    content: 'Start your morning with simple stretches to energize your day.',
    category: 'Stretching',
    writtenTime: '2024-04-20',
    likes: 30,
    views: 52,
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-04-20'),
    comments: [],
    imageUrl: img1,
  },
  {
    id: 2,
    title: '3대와 함께하는 하체 운동',
    userId: 'user002',
    purpose: 'High-intensity fat burn',
    routineParts: ['복근', ' 하체'],
    level: 'Advanced',
    list: [],
    content:
      'Push your limits with this high-intensity cardio routine to blast fat.',
    category: 'Cardio',
    writtenTime: '2024-04-20',
    likes: 47,
    views: 56,
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-04-21'),
    comments: [],
    imageUrl: img2,
  },
  {
    id: 3,
    title: '전신 웨이트',
    userId: 'user003',
    purpose: 'Build muscle strength',
    routineParts: ['전신'],
    level: 'Beginner',
    list: [],
    content: 'Beginner-friendly strength training to help you build muscle.',
    category: 'Strength Training',
    writtenTime: '2024-04-21',
    likes: 85,
    views: 97,
    createdAt: new Date('2024-04-21'),
    updatedAt: new Date('2024-04-22'),
    comments: [],
    imageUrl: img3,
  },
  // {
  //   id: 4,
  //   title: 'Yoga for Stress Relief',
  //   userId: 'user004',
  //   purpose: 'Reduce stress and relax',
  //   target: ['Whole Body'],
  //   level: 'Intermediate',
  //   list: [],
  //   content: 'Yoga sequences to help you unwind and de-stress.',
  //   category: 'Yoga',
  //   writtenTime: '2024-04-22',
  //   likes: 130,
  //   views: 1620,
  //   createdAt: new Date('2024-04-22'),
  //   updatedAt: new Date('2024-04-23'),
  //   comments: [],
  //   imageUrl:
  //     'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  // },
];

const MyRoutinesPage = () => {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        나의 루틴
      </Typography>
      <CardLists contents={myRoutineDummy} pageURL="routine" />
    </>
  );
};

export default MyRoutinesPage;
