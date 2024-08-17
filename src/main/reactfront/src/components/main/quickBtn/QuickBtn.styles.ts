import styled from 'styled-components';

const QBtn = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e0e1dd;

  &:hover svg {
    transform: rotateY(360deg);
    color: #415a77;
  }

  svg {
    font-size: 2.125rem;
    margin-bottom: 3px;
    transition: all 0.6s;
  }
`;

export default QBtn;
