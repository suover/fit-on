import React, { useState } from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 550px;
  height: 40px;
  margin: 1rem auto;
  border: 1px solid black;
  overflow: hidden;
  text-transform: uppercase;
  cursor: pointer;
  &:hover span {
    width: 450px;
    height: 450px;
  }
`;

const ButtonEffect = styled.span`
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  background-color: aliceblue;
  transition: all 0.4s ease-in-out;
  z-index: -1;
  ${ButtonWrapper}:hover & {
    width: 100%;
    height: 100%;
    border-radius: 0; // 원형이 아니라 사각형 효과를 주기 위해
  }
`;

const ButtonText = styled.a`
  display: block;
  line-height: 40px;
  text-decoration: none;
  color: black;
  width: 100%;
  height: 100%;
  text-align: center;
  z-index: 1; // ButtonEffect를 밑으로 가도록 z-index 설정
`;

interface Props {
  text: string;
}
interface FancyButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

// const FancyButton: React.FC<Props> = ({ text }) => {
const FancyButton: React.FC<FancyButtonProps> = ({ children, onClick }) => {
  return (
    <ButtonWrapper onClick={onClick}>
      <ButtonEffect />
      <ButtonText>{children}</ButtonText>
    </ButtonWrapper>
  );
};

export default FancyButton;
