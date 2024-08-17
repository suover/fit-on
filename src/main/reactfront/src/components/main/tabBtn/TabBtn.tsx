import React from 'react';

import Button from './TabBtn.styles';

interface TabBtnProps {
  children: string;
  selected: string;
  onSelect: (selected: string) => void;
  className?: string;
}

const TabBtn: React.FC<TabBtnProps> = ({
  children,
  selected,
  onSelect,
  className,
}) => {
  let isActive: boolean = selected === children;

  const handleClick = (event: React.MouseEvent): void => {
    onSelect(children);
  };

  return (
    <Button
      $active={isActive}
      onClick={handleClick}
      className={className?.trim().length === 0 ? undefined : className}
    >
      {children}
    </Button>
  );
};

export default TabBtn;
