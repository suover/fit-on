import styled from 'styled-components';

const InputField = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 5px;

  textarea {
    width: 90%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    resize: none;
    margin-right: 10px;
    font-size: 1rem;
    font-family: 'Noto Sans KR', 'Raleway', sans-serif;

    &:focus {
      outline: none;
    }
  }

  button {
    width: 9%;
    height: 100%;
    background: transparent;
    font-size: 1rem;
    border: 1px solid #777;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #333;
      color: #fff;
    }
  }
`;

export default InputField;
