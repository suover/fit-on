import React from 'react';
import { Select, SelectCardContainer } from '../../styles/order/Order.Styles';

interface SelectCardProps {
  paymentMethod: string;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectCard: React.FC<SelectCardProps> = ({
  paymentMethod,
  handleSelectChange,
}) => {
  return (
    <div>
      <SelectCardContainer>
        <Select
          id="paymentMethod"
          value={paymentMethod}
          onChange={handleSelectChange}
        >
          <option value="hd">현대카드</option>
          <option value="samsung">삼성카드</option>
          <option value="kb">국민카드</option>
          <option value="shinhan">신한카드</option>
          <option value="nh">NH농협카드</option>
          <option value="lotte">롯데카드</option>
          <option value="hana">하나카드</option>
        </Select>
      </SelectCardContainer>
    </div>
  );
};

export default SelectCard;
