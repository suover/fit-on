import { TableCell } from '@mui/material';
import styled from 'styled-components';

export const HeaderTableCell = styled(TableCell)`
  background: #f5f5f5;
  font-weight: bold;
`;

export const ButtonGroups = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: flex-end;

  & > :first-child {
    margin-right: auto;
  }
`;
