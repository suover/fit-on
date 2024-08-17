import styled from 'styled-components';

export const Container = styled.div`
  color: #252a3b;
`;

export const Heading = styled.h2`
  color: #53646f;
  font-weight: 400;
`;

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const TableHead = styled.thead`
  th {
    background-color: aliceblue;
    color: #9eabb4;
    font-weight: 500;
    text-transform: uppercase;
    padding: 10px 5px;
    min-width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border: 1px solid #e4e9ea;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #e4e9ea;
  &:hover {
    background-color: #f4f4f8;
  }
`;

export const TableData = styled.td<{ $Width?: number }>`
  padding: 10px 5px;
  cursor: pointer;
  font-size: 14px;
  color: #53646f;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  border: 1px solid #e4e9ea;
  position: relative;
  max-width: ${(props) => (props.$Width ? `${props.$Width}px` : 'none')};
  &:first-child {
    padding: 12px 5px;
    min-width: 50px;
  }
`;

export const Image = styled.div<{ $backgroundImage: string }>`
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-image: url(${(props) => props.$backgroundImage});
  background-position: center;
  background-size: cover;
`;

export const DetailContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  padding-left: 50px;
`;

export const PrimaryText = styled.p`
  color: #53646f;
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Category = styled.span`
  color: #9eabb4;
  font-size: 12px;
`;

interface StatusIndicatorProps {
  $color: string;
  $backgroundColor: string;
}

export const StatusIndicator = styled.span<StatusIndicatorProps>`
  color: ${(props) => props.$color};
  text-align: left;
  &:before {
    content: '';
    width: 9px;
    height: 9px;
    display: inline-block;
    margin-right: 7px;
    border-radius: 50%;
    background-color: ${(props) => props.$backgroundColor};
  }
`;
