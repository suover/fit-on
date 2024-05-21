import React from 'react';
import {
  Select,
  SelectAccountContainer,
} from '../../styles/order/Order.Styles';

interface SelectAccountProps {
  paymentMethod: string;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  accountNumber: string;
  handleAccountNumberChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

const SelectAccount: React.FC<SelectAccountProps> = ({
  paymentMethod,
  handleSelectChange,
  accountNumber,
  handleAccountNumberChange,
}) => {
  return (
    <SelectAccountContainer>
      <Select
        id="bankSelect"
        value={paymentMethod}
        onChange={handleSelectChange}
      >
        <option value="kbB">국민은행</option>
        <option value="shinhanB">신한은행</option>
        <option value="ourB">우리은행</option>
        <option value="nhB">농협은행</option>
        <option value="hanaB">하나은행</option>
        <option value="cityB">시티은행</option>
        <option value="samsungB">대구은행</option>
        <option value="samsungB">제주은행</option>
        <option value="samsungB">부산은행</option>
      </Select>
    </SelectAccountContainer>
  );
};

export default SelectAccount;
