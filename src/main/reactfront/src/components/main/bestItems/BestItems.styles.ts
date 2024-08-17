import styled from 'styled-components';

const Items = styled.div`
  min-height: 375px;
  display: flex;
  justify-content: space-between;
  align-items: start;
  position: relative;

  p.text {
    width: 100%;
    height: 100%;
    padding-top: 150px;
    font-weight: bold;
  }
`;

const CustomBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-100%);
  z-index: 10;
  cursor: pointer;
  background: transparent;
  color: #555;

  svg {
    font-size: 2rem;
  }
`;

const PrevBtn = styled(CustomBtn)`
  left: -50px;
`;

const NextBtn = styled(CustomBtn)`
  right: -50px;
`;

export { Items, PrevBtn, NextBtn };
