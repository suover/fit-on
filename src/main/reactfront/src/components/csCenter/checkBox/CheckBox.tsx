import React from 'react';

import CheckboxField from './CheckBox.styles';

interface CheckBoxProps {
  children: React.ReactNode;
  onCheck: () => void;
  isCheck: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({ children, onCheck, isCheck }) => {
  const handleCheck = (): void => {
    onCheck();
  };

  return (
    <CheckboxField>
      <input
        type="checkbox"
        id="filterUserPost"
        onChange={handleCheck}
        checked={isCheck && true}
      />
      <label htmlFor="filterUserPost">
        <span></span>
        {children}
      </label>
    </CheckboxField>
  );
};

export default CheckBox;
