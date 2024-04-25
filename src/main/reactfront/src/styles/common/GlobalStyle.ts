import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    line-height: 1.5;
    background: #fefefe;
    font-family: 'Noto Sans KR', 'Raleway', sans-serif;
    font-size: 16px;
    color: #333;
    cursor: default;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  button,input {
    outline: none;
    border: none;
  }

  img {
    display: block;
    border: 0;
  }
`;

export default GlobalStyle;
