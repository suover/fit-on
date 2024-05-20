import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface UnstyledSelectFormProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
}
const StyledFormControl = styled(FormControl)({
  width: '90px',
});
const StyledMenuItem = styled(MenuItem)({});
const StyledSelect = styled(Select)({
  height: '37px',
  '& .MuiSelect-select': {
    fontSize: '0.85rem',
  },
  textAlign: 'center',
});
const StyledInputLabel = styled(InputLabel)({
  textAlign: 'center',
  width: '100%',
});

function UnstyledSelectForm({ value, onChange }: UnstyledSelectFormProps) {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event as SelectChangeEvent<string>);
  };

  return (
    <StyledFormControl>
      <StyledInputLabel id="product-select-label">필수 옵션</StyledInputLabel>
      <StyledSelect
        labelId="product-select-label"
        id="product-select"
        value={value}
        label="옵션을 선택하세요."
        onChange={handleChange}
      >
        <StyledMenuItem value="블랙">블랙</StyledMenuItem>
        <StyledMenuItem value="네이비">네이비</StyledMenuItem>
        <StyledMenuItem value="민트">민트</StyledMenuItem>
      </StyledSelect>
    </StyledFormControl>
  );
}

export default UnstyledSelectForm;
