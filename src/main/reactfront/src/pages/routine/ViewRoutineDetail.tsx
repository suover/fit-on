import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import { Container } from '@mui/material';
import PostDetail from '../../components/postDetail/PostDetail';

const ViewRoutineDetail = () => {
  const { routineNo } = useParams<{ routineNo: string }>();
  const [routineData, setRoutineData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const incrementViewCountAndFetchData = async () => {
      try {
        const response = await axios.get(`/api/routine/${routineNo}`);
        setRoutineData(response.data);

        const visitedKey = `visited_${routineNo}`;

        if (!visitedKey) {
          await axios.put(`/api/routine/increment-view/${routineNo}`);
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
        Loading...
      </div>
    );
  }

  if (error || !routineData) {
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
