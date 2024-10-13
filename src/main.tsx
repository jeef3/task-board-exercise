import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "react-modal-hook";
import { ApolloProvider } from "@apollo/client";

import App from "./App.tsx";
import { client } from "./connection.ts";
import GlobalStyle from "./GlobalStyle.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <ModalProvider>
        <GlobalStyle />

        <App />
      </ModalProvider>
    </ApolloProvider>
  </StrictMode>,
);
