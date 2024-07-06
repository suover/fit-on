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
        const response = await axios.get(`/api/routine/${routineNo}`);
        setRoutineData(response.data);

        const visitedKey = `visited_${routineNo}`;
        const isVisited = localStorage.getItem(visitedKey);

        if (!isVisited) {
          // 조회수 증가 API 호출
          await axios.put(`/api/routine/increment-view/${routineNo}`);
          localStorage.setItem(visitedKey, 'true');
        }
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
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '50px',
          height: '500px',
        }}
      >
        로딩중🔥🔥🔥🔥🔥🔥
      </div>
    );
  }

  if (!routineData) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: '50px',
          height: '500px',
        }}
      >
        찾으시는 페이지가 없습니다😅
      </div>
    );
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
