import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  useSubscription
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { split, HttpLink } from "@apollo/client";

import App from "./components/App";
import { getMainDefinition } from "@apollo/client/utilities";

const root = ReactDOM.createRoot(document.getElementById(
  "root"
) as HTMLElement);
// GraphQL test subscription

const client = new ApolloClient({
  uri: "http://localhost:4000/",
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
