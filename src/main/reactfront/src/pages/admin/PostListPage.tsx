import React, { useState } from 'react';
import { Information, informations } from '../../types/admin/InformationData';
import {
  Container,
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import GenericTable from '../../components/genericTable/GenericTable';
import { Typography } from '@mui/material';
import { Info, Search } from '../../styles/admin/PostListPage.styles';
import SearchBox from '../../components/common/search/SearchBox';
import GenericButton from '../../components/common/genericButton/GenericButton';
import { useNavigate } from 'react-router-dom';

const PostListPage: React.FC = () => {
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState<Information[]>(informations);

  const handleSearch = (query: string) => {
    const filtered = informations.filter(
      (information) =>
        information.id.includes(query) ||
        information.title.includes(query) ||
        information.writer.includes(query) ||
        information.date.includes(query),
    );
    setFilteredInfo(filtered);
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
    <Container
      style={{
        marginLeft: '45px',
        marginRight: '45px',
        marginTop: '100px',
        height: '700px',
      }}
    >
      <Info>
        <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
          Fit On 정보글목록
        </Typography>
        <GenericButton
          style={{ marginBottom: '10px' }}
          onClick={() => navigate('/post-register')}
        >
          게시글 작성
        </GenericButton>
      </Info>
      <Search>
        <SearchBox onSearch={handleSearch} styleProps={{ width: '200px' }} />
      </Search>
      <GenericTable
        columns={columns}
        data={filteredInfo}
        renderRow={(information: Information) => (
          <TableRow key={information.id}>
            <TableData>{information.id}</TableData>
            <TableData>{information.title}</TableData>
            <TableData>{information.writer}</TableData>
            <TableData>{information.date}</TableData>
            <TableData>{information.view}</TableData>
            <TableData>{information.like}</TableData>
          </TableRow>
        )}
        includeCheckboxes={false}
      />
    </Container>
  );
};

export default PostListPage;
