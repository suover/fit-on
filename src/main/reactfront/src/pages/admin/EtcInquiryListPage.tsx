import React, { useState } from 'react';
import {
  Container,
  StatusIndicator,
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import { Search } from '../../styles/admin/EtcInquiryListPage.styles';
import { Typography } from '@mui/material';
import SearchBox from '../../components/common/search/SearchBox';
import GenericTable from '../../components/genericTable/GenericTable';
import { EtcInquiry, etcInquiries } from '../../types/admin/EtcInquiryDatat';

const EtcInquiryListPage = () => {
  const [filteredEtcInquiries, setFilteredEtcInquiries] =
    useState<EtcInquiry[]>(etcInquiries);

  const handleSearch = (query: string) => {
    const filtered = etcInquiries.filter(
      (etcInquiry) =>
        etcInquiry.id.includes(query) ||
        etcInquiry.title.includes(query) ||
        etcInquiry.writer.includes(query) ||
        etcInquiry.status.includes(query),
    );
    setFilteredEtcInquiries(filtered);
  };
  const columns = [
    { id: 'id', label: '번호', width: 30 },
    { id: 'title', label: '질문 제목', width: 100 },
    { id: 'category', label: '카테고리', width: 30 },
    { id: 'writer', label: '작성자', width: 30 },
    { id: 'status', label: '상태', width: 30 },
    { id: 'date', label: '작성일자', width: 30 },
  ];
  return (
    <>
      <Container
        style={{
          marginLeft: '45px',
          marginRight: '45px',
          marginTop: '100px',
          height: '700px',
        }}
      >
        <Search>
          <Typography
            sx={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            Fit On 문의목록
          </Typography>
          <SearchBox onSearch={handleSearch} styleProps={{ width: '200px' }} />
        </Search>
        <GenericTable
          columns={columns}
          data={filteredEtcInquiries}
          renderRow={(etcInquiry: EtcInquiry) => (
            <TableRow key={etcInquiry.id}>
              <TableData>{etcInquiry.id}</TableData>
              <TableData>{etcInquiry.title}</TableData>
              <TableData>{etcInquiry.category}</TableData>
              <TableData>{etcInquiry.writer}</TableData>
              <TableData>
                <StatusIndicator
                  $color={etcInquiry.status === '답변완료' ? 'red' : 'gray'}
                  $backgroundColor={
                    etcInquiry.status === '답변완료' ? 'red' : 'gray'
                  }
                >
                  {etcInquiry.status}
                </StatusIndicator>
              </TableData>
              <TableData>{etcInquiry.date}</TableData>
            </TableRow>
          )}
          includeCheckboxes={false}
        />
      </Container>
    </>
  );
};

export default EtcInquiryListPage;
