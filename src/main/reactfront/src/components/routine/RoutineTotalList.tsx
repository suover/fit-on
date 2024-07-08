import React, { useEffect, useState } from 'react';
import CardLists from '../cardList/CardList';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import { Pagination, Box } from '@mui/material';

interface RoutineTotalListProps {
  searchQuery: string;
}

const RoutineTotalList: React.FC<RoutineTotalListProps> = ({ searchQuery }) => {
  const [routines, setRoutines] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await axios.get('/api/routine/list', {
          params: { page: page - 1, size: pageSize, query: searchQuery },
        });
        const transformedData = response.data.map((info: any) => ({
          ...info,
          id: info.routineId, // routineId를 id로 변환
        }));
        setRoutines(transformedData);

        const countResponse = await axios.get('/api/routine/count', {
          params: { query: searchQuery },
        });
        setTotalPages(Math.ceil(countResponse.data / pageSize));
      } catch (error) {
        console.error('Failed to fetch routines:', error);
      }
    };

    fetchRoutines();
  }, [page, searchQuery]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  return (
    <Box>
      <CardLists contents={routines} pageURL="routine" Icon={ShareIcon} />
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default RoutineTotalList;
