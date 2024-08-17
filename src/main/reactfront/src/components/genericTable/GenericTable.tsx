import React, { useState, useEffect, useRef } from 'react';
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
  includeCheckboxes = false,
  checkboxColumnWidth = '50px',
  renderRow,
}: TableProps<T>) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (includeCheckboxes) {
      setSelected({});
      setSelectAll(false);
    }
  }, [data, includeCheckboxes]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const newSelected = data.reduce<{ [key: string]: boolean }>((acc, item) => {
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
      Object.values(newSelected).length === data.length &&
        Object.values(newSelected).every(Boolean),
    );
  };

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
          {data.map((item) =>
            renderRow(item, selected[item.id] || false, handleSelectClick),
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default GenericTable;
