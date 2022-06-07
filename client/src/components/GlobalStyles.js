import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Poppins:wght@300;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700&family=Roboto:wght@100;300;400;500;700;900&display=swap');


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
