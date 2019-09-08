import { createGlobalStyle } from 'styled-components';

export const GlobalResetsStyle = createGlobalStyle`
  html, body, #app {
    height: 100%;
    display: flow-root; /* prevent margin collapse */
  }

  body {
    margin: 0;
    font-family: 'Courier New', Courier, monospace;
  }

  * {
    color: inherit;
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }
`;
