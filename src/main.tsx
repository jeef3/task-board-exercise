import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ModalProvider } from "react-modal-hook";
import { ApolloProvider } from "@apollo/client";

import App from "./App.tsx";
import { client } from "./connection.ts";
import GlobalStyle from "./GlobalStyle.ts";
import { CurrentBoardProvider } from "./hooks/CurrentBoardContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <CurrentBoardProvider>
        <ModalProvider>
          <GlobalStyle />

          <App />
        </ModalProvider>
      </CurrentBoardProvider>
    </ApolloProvider>
  </StrictMode>,
);
