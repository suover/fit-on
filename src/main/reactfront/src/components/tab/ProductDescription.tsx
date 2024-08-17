import React, { useState } from 'react';
import FancyButton from './MoreViewBtn';
import styled from 'styled-components';

const ImageContainer = styled.div<{ isExpanded: boolean }>`
  max-height: ${(props) => (props.isExpanded ? 'none' : '460px')};
  overflow: hidden;
  transition: max-height 0.3s ease;
  width: 100%;
`;

const StyledImage = styled.img`
  width: 100%;
`;

interface ProductDescriptionProps {
  src: string;
  alt: string;
}
// ProductDescription 상품상세설명 tab 이미지 부분
const ProductDescription: React.FC<ProductDescriptionProps> = ({
  src,
  alt,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <ImageContainer isExpanded={isExpanded}>
        <StyledImage src={src} alt={alt} />
      </ImageContainer>
      <FancyButton onClick={toggleExpand}>
        {isExpanded ? '접기' : '더보기'}
      </FancyButton>
    </div>
  );
};

export default ProductDescription;
