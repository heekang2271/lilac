import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
  }

  body {
    line-height: 1.5;
    font-size: 16px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  button {
    margin: 0;
    padding: 0;
    background-color: transparent;
    font: inherit;
    outline: none;
    border: none;
    cursor: pointer;
  }

  input, textarea {
    font: inherit;
    outline: none;
  }

  img {
    display: block;
  }
`;
