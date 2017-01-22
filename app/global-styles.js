import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
    font-size: 62.5%;
  }
  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    min-height: 100%;
  }

  body.fontLoaded {
    font-family: 'Roboto', sans-serif;
  }

  #app {
    background-color: #fafafa;
    height: 100%;
    min-height: 100%;
    width: 100%;
  }
`;
