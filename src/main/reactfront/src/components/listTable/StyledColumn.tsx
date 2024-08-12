import React from 'react';

import Column from './StyledColumn.styles';

interface StyledColumnProps {
  width: number;
  marginRight?: number;
  align?: string;
  children: React.ReactNode;
}

const StyledColumn: React.FC<StyledColumnProps> = ({
  width,
  marginRight,
  align,
  children,
}) => {
  return (
    <Column $width={width} $marginRight={marginRight} $align={align}>
      {children}
    </Column>
  );
};

export default StyledColumn;
