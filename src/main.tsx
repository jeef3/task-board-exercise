import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

import App from "./App.tsx";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APP_GRAPHQL_URI,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: import.meta.env.VITE_APP_USER_ID,
  },
}));

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_APP_GRAPHQL_WS_URI,
  }),
);

const client = new ApolloClient({
  link: authLink.split(
    ({ query }) => {
      const def = getMainDefinition(query);
      return (
        def.kind === "OperationDefinition" && def.operation === "subscription"
      );
    },
    wsLink,
    httpLink,
  ),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
);
