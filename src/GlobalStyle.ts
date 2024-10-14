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

  hr {
    margin: 4px;
    width: 100%;
    height: 0;

    border: 0;
    border-bottom: solid 1px hsl(0 0% 0% / 10%);
  }
`;

export default GlobalStyle;
