import React, { useState } from 'react';
import {
  StatusIndicator,
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import { Search } from '../../styles/administrator/EtcInquiryListPage.styles';
import { Box, Typography } from '@mui/material';
import SearchBox from '../../components/common/search/SearchBox';
import GenericTable from '../../components/genericTable/GenericTable';
import {
  EtcInquiry,
  etcInquiries,
} from '../../types/administrator/EtcInquiryDatat';

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
    <Box sx={{ minHeight: '600px' }}>
      <Search>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
          }}
        >
          Fit On 문의목록
        </Typography>
        <SearchBox onSearch={handleSearch} />
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
    </Box>
  );
};

export default EtcInquiryListPage;
