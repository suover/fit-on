import styled from 'styled-components';

const ToTopBtn = styled.button<{ $isShow: boolean }>`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 10000;
  width: 50px;
  height: 50px;
  background: #e0e1dd;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  display: ${(props) => (props.$isShow ? 'block' : 'none')};

  &:hover {
    background: #1b263b;
    color: #fff;
  }
`;

export default ToTopBtn;
