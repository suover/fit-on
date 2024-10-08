import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Search } from '../../styles/administrator/ItemInquiryListPage.styles';
import {
  StatusIndicator,
  TableData,
  TableRow,
} from '../../components/genericTable/GenericTable.styles';
import SearchBox from '../../components/common/search/SearchBox';
import GenericTable from '../../components/genericTable/GenericTable';
import {
  ItemInquiry,
  inquiries,
} from '../../types/administrator/ItemInquiryData';

const ItemInquiryListPage = () => {
  const [filteredInquiries, setFilteredInquiries] =
    useState<ItemInquiry[]>(inquiries);

  const handleSearch = (query: string) => {
    const filtered = inquiries.filter(
      (inquiry) =>
        inquiry.id.includes(query) ||
        inquiry.title.includes(query) ||
        inquiry.writer.includes(query) ||
        inquiry.status.includes(query),
    );
    setFilteredInquiries(filtered);
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
        data={filteredInquiries}
        renderRow={(inquiry: ItemInquiry) => (
          <TableRow key={inquiry.id}>
            <TableData>{inquiry.id}</TableData>
            <TableData>{inquiry.title}</TableData>
            <TableData>{inquiry.category}</TableData>
            <TableData>{inquiry.writer}</TableData>
            <TableData>
              <StatusIndicator
                $color={inquiry.status === '답변완료' ? 'red' : 'gray'}
                $backgroundColor={
                  inquiry.status === '답변완료' ? 'red' : 'gray'
                }
              >
                {inquiry.status}
              </StatusIndicator>
            </TableData>
            <TableData>{inquiry.date}</TableData>
          </TableRow>
        )}
        includeCheckboxes={false}
      />
    </Box>
  );
};

export default ItemInquiryListPage;
