import React, { useState } from 'react';
import {
  Community,
  communities,
} from '../../types/administrator/CommunityData';
import {
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import GenericTable from '../../components/genericTable/GenericTable';
import { Box, Typography } from '@mui/material';
import { Search } from '../../styles/administrator/CommunityListPage.styles';
import SearchBox from '../../components/common/search/SearchBox';

const CommunityListPage: React.FC = () => {
  const [filtereCommunities, setFilteredCommunities] =
    useState<Community[]>(communities);

  const handleSearch = (query: string) => {
    const filtered = communities.filter(
      (community) =>
        community.id.includes(query) ||
        community.title.includes(query) ||
        community.writer.includes(query),
    );
    setFilteredCommunities(filtered);
  };

  const columns = [
    { id: 'id', label: '번호', width: 30 },
    { id: 'title', label: '게시글 제목', width: 100 },
    { id: 'writer', label: '작성자', width: 50 },
    { id: 'date', label: '작성일', width: 50 },
    { id: 'view', label: '조회수', width: 50 },
    { id: 'like', label: '좋아요', width: 50 },
  ];
  return (
    <Box sx={{ minHeight: '600px' }}>
      <Search>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Fit On 커뮤니티목록
        </Typography>
        <SearchBox onSearch={handleSearch} />
      </Search>
      <GenericTable
        columns={columns}
        data={filtereCommunities}
        renderRow={(community: Community) => (
          <TableRow key={community.id}>
            <TableData>{community.id}</TableData>
            <TableData>{community.title}</TableData>
            <TableData>{community.writer}</TableData>
            <TableData>{community.date}</TableData>
            <TableData>{community.view}</TableData>
            <TableData>{community.like}</TableData>
          </TableRow>
        )}
        includeCheckboxes={false}
      />
    </Box>
  );
};

export default CommunityListPage;
