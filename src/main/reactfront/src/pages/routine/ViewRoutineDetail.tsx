import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';
import PostDetail from '../../components/postDetail/PostDetail';
import myroutine from '../../assets/img/routine/myroutine.jpg';
const dummyData = [
  {
    postId: 1,
    partId: 1,
    levelId: 1,
    goalId: 1,
    userId: 'zl존승민',
    title: '저의 헬스 루틴입니다.',
    content: '운동하고 한 번 포징해봤습니다 ㅎㅎ;;',
    imageUrl: myroutine,
    createdAt: '2024-05-30T12:34:56Z',
    comments: [],
    viewCount: 1,
    likes: 0,
  },
  {
    postId: 2,
    partId: 2,
    levelId: 2,
    goalId: 2,
    userId: 'zl존승민',
    title: '저의 헬스 루틴입니다.',
    content: '여기 내용이 들어갑니다.',
    createdAt: '2023-05-01T12:34:56Z',
    comments: [],
    viewCount: 25,
    likes: 10,
  },
  {
    postId: 3,
    partId: 3,
    levelId: 3,
    goalId: 3,
    userId: 'Writer 2',
    title: 'Routine 2',
    content: 'Routine 2 내용',
    createdAt: '2023-05-02T12:34:56Z',
    comments: [],
    viewCount: 200,
    likes: 20,
  },
  {
    postId: 4,
    partId: 4,
    levelId: 4,
    goalId: 4,
    userId: 'Writer 3',
    title: 'Routine 3',
    content: 'Routine 3 내용',
    createdAt: '2023-05-03T12:34:56Z',
    comments: [],
    viewCount: 300,
    likes: 30,
  },
  // ... 나머지 더미 데이터들
];

const ViewRoutineDetail = () => {
  const { routineNo } = useParams<{ routineNo: string }>(); // useParams를 통해 route parameter를 가져옵니다.
  const [routineData, setRoutineData] = useState<any>(null); // 초기 상태를 null로 설정합니다.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchRoutineData = () => {
      try {
        // 더미 데이터에서 routineNo에 해당하는 데이터를 찾습니다.
        const data = dummyData.find(
          (routine) => routine.postId.toString() === routineNo,
        );
        if (data) {
          setRoutineData(data);
        } else {
          setError('No routine found');
        }
      } catch (error) {
        setError(error);
        console.error('Error fetching routine data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutineData();
  }, [routineNo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!routineData) {
    return <div>No routine found</div>;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ minHeight: '700px', padding: '50px 0 100px' }}
    >
      <PostDetail data={routineData} pageURL="routine" />
    </Container>
  );
};

export default ViewRoutineDetail;
