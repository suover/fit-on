import styled from 'styled-components';

interface ButtonProps {
  $active: boolean;
  className?: string;
}

const Button = styled.button<ButtonProps>`
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;
  background: ${(props) => (props.$active ? '#444' : '#f2f2f2')};
  color: ${(props) => (props.$active ? '#fff' : '#333')};

  &:hover {
    background: #555;
    color: #fff;
  }

  &.service {
    border-radius: 0px;
    flex: 1;
    height: 50px;
    margin-right: 3px;
    font-size: 1rem;
  }
`;

export default Button;

// background: ${(props) => (props.$active ? '#1b263b' : '#e0e1dd')};
// color: ${(props) => (props.$active ? '#fff' : '#333')};
