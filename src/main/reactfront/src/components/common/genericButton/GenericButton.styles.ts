import styled, { keyframes } from 'styled-components';

// Props 인터페이스 정의
export interface CustomButtonProps {
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const rippleEffect = keyframes`
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

// styled-components를 사용한 스타일링
export const CustomButton = styled.button<CustomButtonProps>`
  position: relative;
  overflow: hidden;
  font-weight: bold;
  border: 1px solid black;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: white;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.1);
    transform: scale(0);
    animation: ${rippleEffect} 0.6s ease-out;
  }
`;
