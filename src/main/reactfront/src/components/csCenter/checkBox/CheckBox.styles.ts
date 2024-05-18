import styled from 'styled-components';
import checkboxImg from '../../../assets/checkbox-01.png';

const CheckboxField = styled.div`
  margin-right: 15px;

  input[type='checkbox'] {
    display: none;

    &:checked + label span {
      background-position: right center;
    }
  }

  label {
    span {
      display: inline-block;
      width: 18px;
      height: 18px;
      margin-left: 10px;
      margin-right: 3px;
      background: url(${checkboxImg}) no-repeat;
      background-position: left center;
      vertical-align: middle;
    }
  }
`;

export default CheckboxField;
