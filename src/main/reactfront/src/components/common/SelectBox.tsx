import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CSSProperties } from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  helperText: string;
  onChange: (value: string | null) => void;
  value?: string | null;
  allowNull?: boolean;
  style?: CSSProperties;
};

const SelectBox = ({
  label,
  options,
  helperText,
  onChange,
  value = '', //추가
  allowNull = false,
  style,
}: SelectProps) => {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(
    value || '',
  ); // 수정: 초기 상태를 props에서 받은 값으로 설정
  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue === '' ? null : newValue);
  };

  React.useEffect(() => {
    setSelectedValue(value); // 추가: props의 value가 변경될 때마다 내부 상태 업데이트
  }, [value]);

  return (
    <div>
      <FormControl
        variant="outlined"
        sx={{ minWidth: 150, mr: 1, height: '72px', mb: 2, ...style }}
      >
        <InputLabel id={`${label}-label`} shrink={!!selectedValue || undefined}>
          {label}
        </InputLabel>
        <Select
          labelId={`${label}-label`}
          id={`${label}-select`}
          value={selectedValue || ''}
          label={label}
          onChange={handleChange}
        >
          {allowNull && (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {selectedValue === '' && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default SelectBox;
