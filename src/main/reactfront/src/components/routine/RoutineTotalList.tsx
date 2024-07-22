import React, { useEffect, useState } from 'react';
import CardLists from '../cardList/CardList';
import ShareIcon from '@mui/icons-material/Share';
import axios from 'axios';
import { Pagination, Box } from '@mui/material';

const RoutineTotalList = ({ searchQuery }: { searchQuery: any }) => {
  const [routines, setRoutines] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 12;

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await axios.get('/api/routine/list', {
          params: { page: page - 1, size: pageSize, query: searchQuery },
        });
        const { content, totalPages } = response.data;
        const transformedData = content.map((info: any) => ({
          ...info,
          id: info.routineId,
          likes: info.likes, // 좋아요 수 포함
        }));
        setRoutines(transformedData);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Failed to fetch routines:', error);
      }
    };

    fetchRoutines();
  }, [page, searchQuery]);

  const handlePageChange = (event: any, value: any) => {
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
