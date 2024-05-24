import React from 'react';
import { Typography } from '@mui/material';
import CardLists from '../../components/cardList/CardList';

const sharedRoutineDummy = [
  {
    id: 1,
    title: 'Morning Flexibility Routine',
    userId: 'user001',
    purpose: 'Increase morning energy',
    target: ['Legs', 'Back'],
    level: 'Beginner',
    list: [],
    content: 'Start your morning with simple stretches to energize your day.',
    category: 'Stretching',
    writtenTime: '2024-04-20',
    likes: 120,
    views: 1500,
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-04-20'),
    comments: [],
    imageUrl:
      'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 2,
    title: 'Advanced Cardio Blast',
    userId: 'user002',
    purpose: 'High-intensity fat burn',
    target: ['Cardiovascular'],
    level: 'Advanced',
    list: [],
    content:
      'Push your limits with this high-intensity cardio routine to blast fat.',
    category: 'Cardio',
    writtenTime: '2024-04-20',
    likes: 95,
    views: 1120,
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-04-21'),
    comments: [],
    imageUrl:
      'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 3,
    title: 'Strength Training for Beginners',
    userId: 'user003',
    purpose: 'Build muscle strength',
    target: ['Arms', 'Chest'],
    level: 'Beginner',
    list: [],
    content: 'Beginner-friendly strength training to help you build muscle.',
    category: 'Strength Training',
    writtenTime: '2024-04-21',
    likes: 85,
    views: 940,
    createdAt: new Date('2024-04-21'),
    updatedAt: new Date('2024-04-22'),
    comments: [],
    imageUrl:
      'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
];

const SharedRoutinePage = () => {
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
        공유받은 루틴
      </Typography>
      <CardLists contents={sharedRoutineDummy} pageURL="routine" />
    </>
  );
};

export default SharedRoutinePage;
