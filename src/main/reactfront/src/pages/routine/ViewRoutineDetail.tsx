import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container } from '@mui/material';
import PostDetail from '../../components/postDetail/PostDetail';

const ViewRoutineDetail = () => {
  const { routineNo } = useParams<{ routineNo: string }>();
  const [routineData, setRoutineData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const hasIncrementedView = useRef(false);

  useEffect(() => {
    const incrementViewCountAndFetchData = async () => {
      const visitedKey = `visited_${routineNo}`;
      const isVisited = localStorage.getItem(visitedKey);

      try {
        if (!isVisited && !hasIncrementedView.current) {
          await axios.put(`/api/routine/increment-view/${routineNo}`);
          localStorage.setItem(visitedKey, 'true');
          hasIncrementedView.current = true;
        }

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
