import React from 'react';
import { OrderInfoProps } from '../../types/orderInterface';

const OrderInformation: React.FC<OrderInfoProps> = ({ src }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}
  >
    <img
      src={src}
      alt="Product"
      style={{
        width: '100px',
        height: '100px',
        marginRight: '50px',
      }}
    />
  </div>
);

export default OrderInformation;
