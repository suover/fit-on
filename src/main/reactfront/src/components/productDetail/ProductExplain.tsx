import React from 'react';
import styled from 'styled-components';
import BasicTabs from '../tab/Tab';

const TabContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: auto;
`;
//하단 상품 상세 Tab 부분
const ProductEx = () => {
  return (
    <div>
      <TabContainer>
        <BasicTabs />
      </TabContainer>
    </div>
  );
};

export default ProductEx;
