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
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions"
  })
);

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

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

const COMMENTS_SUBSCRIPTION = gql`
  subscription OnCommentAdded($postID: ID!) {
    commentAdded(postID: $postID) {
      id
      content
    }
  }
`;

function LatestComment() {
  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: 1
  });
  return <h4>New comment: {!loading && data.commentAdded.content}</h4>;
}
// end test subscription
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
