import styled from 'styled-components';

const Column = styled.span<{
  $width: number;
  $marginRight?: number;
  $align?: string;
}>`
  text-align: center;
  width: ${(props) => props.$width}px;
  margin-right: ${(props) => props.$marginRight || 0}px;
  text-align: ${(props) => props.$align || 'center'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Column;
