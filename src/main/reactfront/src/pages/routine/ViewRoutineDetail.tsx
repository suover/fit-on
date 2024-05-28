import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@mui/material';
import PostDetail from '../../components/postDetail/PostDetail';

const ViewRoutineDetail = () => {
  const { routineNo } = useParams<{ routineNo: string }>(); // useParams를 통해 route parameter를 가져옵니다.
  const [routineData, setRoutineData] = useState<any>(null); // 초기 상태를 null로 설정합니다.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const incrementViewCountAndFetchData = async () => {
      try {
        // 조회수 증가 API 호출
        await axios.put(`/api/routine/increment-view/${routineNo}`);

        // 게시글 데이터 가져오기
        const response = await axios.get(`/api/routine/${routineNo}`);
        setRoutineData(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching routine data:', error);
      } finally {
        setLoading(false);
      }
    };

    incrementViewCountAndFetchData();
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
