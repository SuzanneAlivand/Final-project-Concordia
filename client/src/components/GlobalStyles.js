import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`


*, *::before, *::after {
  box-sizing: border-box;
}
  * {
    margin: 0;
  }
  html, body {
    height: 100%;
    font-family: 'Roboto', sans-serif;
    background-color:#05090c
  }
 
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  
  img, picture, video, canvas, svg {
    max-width: 100%;
  }
  input, button, textarea, select {
    font: inherit;
  }
  
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  
  #root, #__next {
    isolation: isolate;
    --color-primary: #05090c;  
    --color-secondary:#4bacdd ; 
    --color-tertiary: #00e0c6;
    --color-font: #edf0f2;
  }

a:active {
    color: #4E4E4E;
}
  
`;
