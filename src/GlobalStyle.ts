import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;

    font-family: "Open Sans";
  }

  h1, h2, h3, h4, p {
    margin: 0;
  }

  button {
    text-align: start;
    font-family: inherit;
    font-size: inherit;
  }
`;

export default GlobalStyle;
