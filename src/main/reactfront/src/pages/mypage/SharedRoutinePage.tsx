import React, { useEffect, useState, useContext } from 'react';
import { Typography } from '@mui/material';
import axios from '../../api/axiosConfig';
import CardLists from '../../components/cardList/CardList';
import AuthContext from '../../context/AuthContext';
import ShareIcon from '@mui/icons-material/Share';

const SharedRoutinePage = () => {
  const [sharedRoutines, setSharedRoutines] = useState<any[]>([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchSharedRoutines = async () => {
      try {
        const response = await axios.get('/api/routine/shares', {
          params: { userId: userId },
        });
        const routinesWithIds = response.data.map((routine: any) => ({
          ...routine,
          id: routine.routineId,
        }));

        setSharedRoutines(routinesWithIds);
      } catch (error) {
        console.error('Error fetching shared routines', error);
      }
    };

    fetchSharedRoutines();
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
        공유 루틴
      </Typography>
      <CardLists contents={sharedRoutines} pageURL="routine" Icon={ShareIcon} />
    </>
  );
};

export default SharedRoutinePage;
