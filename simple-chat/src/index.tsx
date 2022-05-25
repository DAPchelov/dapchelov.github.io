import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

import App from "./components/App";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const root = ReactDOM.createRoot(document.getElementById(
  "root"
) as HTMLElement);
// GraphQL test subscription

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/graphql"
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

// end test subscription
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
