import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: import.meta.env.VITE_APP_USER_ID,
  },
}));

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_APP_GRAPHQL_URI,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: import.meta.env.VITE_APP_GRAPHQL_WS_URI,
    connectionParams: {
      headers: {
        Authorization: import.meta.env.VITE_APP_USER_ID,
      },
    },
  }),
);

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return (
      def.kind === "OperationDefinition" && def.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink),
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
