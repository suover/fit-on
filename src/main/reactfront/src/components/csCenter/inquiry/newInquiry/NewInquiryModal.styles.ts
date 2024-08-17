import { FormControl, TextField } from '@mui/material';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  width: 1000px;
  height: 800px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 50px;
  }

  div.heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h3 {
      font-size: 1.5rem;
      font-weight: bold;
    }

    button {
      width: 40px; height: 40px;
      border-radius: 50%;
      text-align: center;
      cursor: pointer;

      svg {
        vertical-align: middle;
      }
    }

    div.inputField {
      select {
        margin-right: 50px;
      }
    }
  }
`;

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    margin-bottom: 30px;
    border-radius: 0;
    color: #333;

    &:hover fieldset {
      border: 1px solid #ccc;
    }

    .Mui-focused fieldset {
      border-color: #ccc;
    }
  }

  .MuiOutlinedInput-root.Mui-focused {
    .MuiOutlinedInput-notchedOutline {
      outline: none;
      border: 1px solid #ccc;
    }
  }

  .MuiInputLabel {
    .MuiInputLabel-shrink {
      color: #333;
    }
  }
`;

const StyledFormControl = styled(FormControl)`
  .MuiOutlinedInput-root {
    margin-bottom: 30px;
    border-radius: 0;
    color: #333;

    &:hover .MuiOutlinedInput-notchedOutline {
      border: 1px solid #ccc;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 1px solid #ccc;
    }
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    outline: none;
    border: 1px solid #ccc;
  }
`;

const SubmitBtn = styled.button`
  display: block;
  width: 120px;
  height: 40px;
  margin: 50px auto 0;
  cursor: pointer;
  background: #333;
  color: #fff;
`;

export { ModalWrapper, StyledTextField, StyledFormControl, SubmitBtn };
