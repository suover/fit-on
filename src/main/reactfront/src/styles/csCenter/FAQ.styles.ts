import styled from 'styled-components';

const InputField = styled.div`
  margin-bottom: 30px;

  div {
    width: 40%;
    height: 45px;
    display: flex;
    align-item: center;

    input {
      width: 100%;
      height: 100%;
      border: 1px solid #555;
      border-radius: 5px;
      padding-left: 8px;
      font-size: 1rem;
      margin-right: 8px;
      box-sizing: border-box;
    }

    svg {
      color: #555;
    }
  }

  span {
    font-size: 0.875rem;
  }
`;

export default InputField;
