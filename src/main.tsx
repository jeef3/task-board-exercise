import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App.tsx";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APP_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: import.meta.env.VITE_APP_USER_ID,
  },
}));

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
