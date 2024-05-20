import styled from 'styled-components';

export const StyledProductDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const StyledRating = styled.div`
  display: flex;
  justify-content: flex-first;
  margin-top: 2px;
  font-size: 0.75rem;
  font-weight: 400;
  & > :first-child {
    margin-right: 5px;
  }
`;
export const NameContainer = styled.div`
  flex: 1; // 좌측에 고정
  display: flex;
  white-space: nowrap; //두줄 되는거 방지
  justify-content: flex-start;
  font-weight: 500;
`;
export const ButtonContainer = styled.div`
  display: flex;
  gap: 3px;
  & button {
    border-radius: 40px;
  }
`;
export const ExplainContainer = styled.div`
  width: 440px;
  font-size: 0.8em;
  p {
    margin: 0; // <p> 태그의 기본 마진 제거
    width: 100%; // <p> 태그가 컨테이너 너비를 전체적으로 채우도록 설정
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #000000;
  width: 100%;
  margin: 0 0;
`;

export const PriceContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
`;
export const QuantityContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 5;
`;
export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 5;
`;
export const ShippingContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 5;
`;
export const Btns = styled.span`
  display: flex;
  gap: 5px;
`;
export const NoticePrice = styled.p`
  font-size: 1.1em;
  font-weight: bold;
`;
export const TotalPrice = styled.p`
  font-size: 1.1em;
  color: red;
  font-weight: bold;
`;
