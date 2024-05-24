import React from 'react';

import StyledColumn from './StyledColumn';
import StyledTable from './ListTable.styles';
import { Link } from 'react-router-dom';

import { Pagination, Stack } from '@mui/material';

type DataType = {
  id: number | string;
  title: string;
  createDate: string;
  views: number;
  likes?: number;
};

interface ColumnInfo {
  columnId: string;
  title: string;
  width: number;
  marginRight?: number;
  align?: string;
}

interface ListTableProps<T> {
  data: T[];
  columnData: ColumnInfo[];
  pageUrl: string;
  paging: boolean;
}

const ListTable = <T extends DataType>({
  data,
  columnData,
  pageUrl,
  paging,
}: ListTableProps<T>) => {
  return (
    <>
      <StyledTable>
        <li>
          {columnData.map((column, idx) => (
            <StyledColumn
              key={column.title + idx}
              width={column.width}
              marginRight={column.marginRight}
            >
              {column.title}
            </StyledColumn>
          ))}
        </li>
        {data.map((eachData, idx) => (
          <Link to={`/${pageUrl}/${eachData.id}`} key={idx}>
            <li>
              {columnData.map((column, idx) => (
                <StyledColumn
                  key={column.title + idx}
                  width={column.width}
                  marginRight={column.marginRight}
                  align={column.align}
                >
                  {eachData[column.columnId as keyof DataType]}
                </StyledColumn>
              ))}
            </li>
          </Link>
        ))}
      </StyledTable>
      {paging && (
        <Stack
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Pagination count={5} variant="outlined" />
        </Stack>
      )}
    </>
  );
};

export default ListTable;
