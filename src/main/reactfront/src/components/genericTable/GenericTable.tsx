import React, { useState, useEffect, useRef } from 'react';
import { Box, Pagination } from '@mui/material';
import { Container, Table, TableHead } from './GenericTable.styles';

interface Column {
  id: string;
  label: string;
  width: number;
}

interface TableProps<T> {
  data: T[];
  columns: Column[];
  rowsPerPage?: number;
  includeCheckboxes?: boolean;
  checkboxColumnWidth?: string;
  renderRow: (
    item: T,
    isSelected: boolean,
    onSelect: (id: string, isSelected: boolean) => void,
  ) => React.ReactNode;
}

const GenericTable = <T extends { id: string }>({
  data,
  columns,
  rowsPerPage = 10,
  includeCheckboxes = false,
  checkboxColumnWidth = '50px',
  renderRow,
}: TableProps<T>) => {
  const [page, setPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (includeCheckboxes) {
      setSelected({});
      setSelectAll(false);
    }
  }, [data, page, includeCheckboxes]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const newSelected = data
      .slice((page - 1) * rowsPerPage, page * rowsPerPage)
      .reduce<{ [key: string]: boolean }>((acc, item) => {
        acc[item.id] = isChecked;
        return acc;
      }, {});
    setSelected(newSelected);
    setSelectAll(isChecked);
  };

  const handleSelectClick = (id: string, checked: boolean) => {
    const newSelected = { ...selected, [id]: checked };
    setSelected(newSelected);
    setSelectAll(
      Object.values(newSelected).length ===
        data.slice((page - 1) * rowsPerPage, page * rowsPerPage).length &&
        Object.values(newSelected).every(Boolean),
    );
  };

  const count = Math.ceil(data.length / rowsPerPage);
  const displayedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  return (
    <Container>
      <Table>
        <TableHead>
          <tr>
            {includeCheckboxes && (
              <th style={{ width: checkboxColumnWidth }}>
                <input
                  ref={checkboxRef}
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllClick}
                />
              </th>
            )}
            {columns.map((column) => (
              <th key={column.id} style={{ width: column.width }}>
                {column.label}
              </th>
            ))}
          </tr>
        </TableHead>
        <tbody>
          {displayedData.map((item) =>
            renderRow(item, selected[item.id] || false, handleSelectClick),
          )}
        </tbody>
      </Table>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChangePage}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Container>
  );
};

export default GenericTable;
