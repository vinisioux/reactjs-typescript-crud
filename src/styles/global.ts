import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import 'simplebar/dist/simplebar.min.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #f5f5f5 ;
    -webkit-font-smoothing: antialiased;
  }
  body html #root {
    height: 100%;
  }

  body, input, button {
    font: 16px "Roboto", sans-serif;
  }
  button {
    cursor: pointer;
  }
`;
