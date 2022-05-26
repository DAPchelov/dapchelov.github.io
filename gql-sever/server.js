import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { PubSub } from "graphql-subscriptions";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { messages } from "./db.js";

const PORT = 4000;
const pubsub = new PubSub();

// Schema definition
const typeDefs = gql`
  type Message {
    id: String!
    user: String!
    content: String!
  }

  type Query {
    message(id: String!): Message!
    messages: [Message!]!
  }

  type Mutation {
    postMessage(user: String!, content: String!): ID!
    deleteMessage(id: String!): Message!
  }
  type Subscription {
    newMessages: [Message!]!
  }
`;

// Resolver map
const resolvers = {
  Query: {
    message: (parent, { id }, context, info) => {
      return messages.find(message => message.id == id);
    },
    messages: (parent, args, context, info) => {
      return messages;
    }
  },

  Mutation: {
    postMessage: (parent, { user, content }, context, info) => {
      const id = messages.length;
      messages.push({ id, user, content });
      pubsub.publish("POST_CREATED", { newMessages: messages });
      return id;
    },
    deleteMessage: (parent, { id }, context, info) => {
      const messageIndex = messages.findIndex(message => message.id == id);

      if (messageIndex === -1) throw new Error("Message not found.");

      const deletedMessages = messages.splice(messageIndex, 1);

      return deletedMessages[0];
    }
  },
  Subscription: {
    newMessages: {
      subscribe: () => pubsub.asyncIterator(["POST_CREATED"])
    }
  }
};

// Create schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

// Set up WebSocket server.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql"
});
const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          }
        };
      }
    }
  ]
});
await server.start();
server.applyMiddleware({ app });

// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
  );
});

pubsub.publish("POST_CREATED", { newMessages: messages });
