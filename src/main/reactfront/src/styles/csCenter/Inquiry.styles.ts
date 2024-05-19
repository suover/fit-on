import styled from 'styled-components';

const InquiryHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const InputField = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const NewInquiryBtn = styled.button`
  width: 120px;
  height: 40px;
  background: #333;
  color: #fff;
  margin-left: auto;
  cursor: pointer;
`;

export { InquiryHeading, InputField, NewInquiryBtn };
