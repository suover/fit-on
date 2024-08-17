import React, { useState } from 'react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import SelectCard from '../../components/order/SelectCard';
import SelectAccount from '../../components/order/SelectAccount';
import {
  SelectCardContainer,
  SelectAccountContainer,
  StyledFormControlLabel,
} from '../../styles/order/Order.Styles';

interface RadioButtonsGroupProps {
  paymentType: string;
  setPaymentType: (value: string) => void;
}
export default function RadioButtonsGroup({
  paymentType,
  setPaymentType,
}: RadioButtonsGroupProps) {
  // 상태 설정
  const [paymentMethod, setPaymentMethod] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  // 이벤트 핸들러
  const handleChangePaymentMethod = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPaymentMethod(event.target.value);
  };

  const handleChangeAccountNumber = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAccountNumber(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        value={paymentType}
        onChange={handleChange}
        name="radio-buttons-group"
      >
        <FormControlLabel
          value="card"
          control={<Radio />}
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              일반결제(신용카드)
              {paymentType === 'card' && <SelectCardContainer />}
            </div>
          }
        />
        <StyledFormControlLabel
            value="kakao"
            control={<Radio />}
            label={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                카카오페이
              </div>
            }
        />
        <StyledFormControlLabel
          value="account"
          control={<Radio />}
          label={
            <div style={{ display: 'flex', alignItems: 'center' }}>
              무통장결제
            </div>
          }
        />
      </RadioGroup>
    </FormControl>
  );
}
