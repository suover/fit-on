import styled from 'styled-components';
import { FormControlLabel } from '@mui/material';

export const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  font-family: 'Noto Sans KR', sans-serif;
  h1 {
    font-size: 24px;
    font-weight: bold;
  }
  h2 {
    font-size: 21px;
    margin-bottom: 20px;
  }
`;

export const Divider = styled.div`
  height: 1.5px;
  background-color: #000000;
  width: 100%;
  margin-bottom: 20px;
`;
export const LightDivider = styled.div`
  height: 0.8px;
  background-color: #000000;
  width: 100%;
  margin-bottom: 20px;
`;

export const InfoRow = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
export const PriceRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: flex-end;
  font-size: 18px;
`;
export const InputLabel = styled.label`
  display: inline-block; // 인라인 블록 요소로 설정
  width: 13%; // 라벨의 너비
  margin-bottom: 5px;
  margin-right: 10px;
  font-size: 15px;
`;

export const InputInfo = styled.input`
  padding: 8px;
  width: 40%; // 입력 필드 너비
  height: 29px;
  margin-bottom: 5px;
  border: 1px solid #b7b7b7;

  box-sizing: border-box;
  &::placeholder {
    color: #aaa;
    font-size: 12px;
  }
`;
export const OrderInfoRow = styled.div`
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 2px;
  padding: 10px;
  font-size: 17px;
`;
export const StrongText = styled.strong`
  // margin-left: 68px;
  // margin-right: 10px;
  color: #f5301c;
`;
export const PaymentMethods = styled.div`
  height: 15vh;
  width: 100%;
  display: flex;
`;
export const TotalPriceTxt = styled.div`
  margin-left: 10px;
  color: #f5301c;
`;
export const Select = styled.select`
  padding: 8px;
  width: 100%;
`;
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;
export const StyledFormControlLabel = styled(FormControlLabel)`
  alignitems: flex-start;
  display: flex;
`;
export const SelectCardContainer = styled.div`
  padding: 8px;
  width: 200px;
`;
export const SelectAccount = styled.div`
  padding: 8px;
  width: 20%;
  margin-bottom: 20px;
`;
export const SelectAccountContainer = styled.div`
  margin-left: 60px;
  display: flex;
  align-items: center;
  width: 350px;
`;
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  margin-top: 40px;
`;
export const Button = styled.button`
  height: 60px;
  width: 50%;
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;

export const Btn = styled.button`
  padding: 8px 10px;
  background-color: #000;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 15px;
  display: flex; // Flexbox 레이아웃 사용
  justify-content: center;
  align-items: center;
  height: 29px; // Input의 높이와 동일하게 설정
  box-sizing: border-box; // padding과 border를 높이에 포함
`;
