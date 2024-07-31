import React, { useEffect, useState, useContext } from 'react';
import { Typography } from '@mui/material';
import CardLists from '../../components/cardList/CardList';
import axios from '../../api/axiosConfig';
import AuthContext from '../../context/AuthContext';
import ShareIcon from '@mui/icons-material/Share';

const MyRoutinesPage = () => {
  const { userId } = useContext(AuthContext);
  const [routines, setRoutines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRoutines = async () => {
      try {
        const response = await axios.get(`/api/routine/user/${userId}`);
        const data = response.data;
        const routinesWithLikes = await Promise.all(
          data.map(async (routine: any) => {
            const likeResponse = await axios.get(
              `/api/routine/${routine.routineId}/likes`,
            );
            return {
              ...routine,
              id: routine.routineId,
              likes: likeResponse.data.count,
            };
          }),
        );

        setRoutines(routinesWithLikes);
      } catch (error) {
        console.error('Error fetching my routines:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchMyRoutines();
    }
  }, [userId]);

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
      <CardLists contents={routines} pageURL="routine" Icon={ShareIcon} />
    </>
  );
};

export default MyRoutinesPage;
