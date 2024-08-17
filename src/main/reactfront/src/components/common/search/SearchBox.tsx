import React, { useState } from 'react';
import {
  Wrapper,
  SearchContainer,
  SearchInput,
  SearchButton,
} from './SearchBox.styles';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  styleProps?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    focusColor?: string;
    placeholderColor?: string;
    width?: string;
  };
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch, styleProps }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <Wrapper {...styleProps}>
      <SearchContainer style={{ width: styleProps?.width || '100%' }}>
        {' '}
        <SearchInput
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearchClick();
          }}
          {...styleProps}
        />
        <SearchButton {...styleProps} onClick={handleSearchClick}>
          <SearchIcon />
        </SearchButton>
      </SearchContainer>
    </Wrapper>
  );
};

export default SearchBox;
