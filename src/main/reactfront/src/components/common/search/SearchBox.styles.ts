import styled from 'styled-components';

interface SearchBoxStyleProps {
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  focusColor?: string;
  placeholderColor?: string;
  width?: string;
}

export const Wrapper = styled.div<SearchBoxStyleProps>`
  background: ${(props) => props.backgroundColor || '#f2f2f2'};
  font-family: 'Open Sans', sans-serif;
  width: ${(props) => props.width || ''};
`;

export const SearchContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const SearchInput = styled.input<SearchBoxStyleProps>`
  flex-grow: 1;
  border: 3px solid ${(props) => props.borderColor || '#00b4cc'};
  border-right: none;
  padding: 5px;
  height: 36px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: ${(props) => props.textColor || '#9dbfaf'};
  box-sizing: border-box;

  &::placeholder {
    color: ${(props) => props.placeholderColor || '#cccccc'};
  }

  &:focus {
    color: ${(props) => props.focusColor || '#00b4cc'};
  }
`;

export const SearchButton = styled.button<SearchBoxStyleProps>`
  width: 40px;
  height: 36px;
  border: 1px solid ${(props) => props.borderColor || '#00b4cc'};
  background: ${(props) => props.borderColor || '#00b4cc'};
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) => props.focusColor || '#009aab'};
  }
`;
