// import { ApolloServer } from 'apollo-server-express';
// import { ApolloServerPluginDrainHttpServer, gql } from 'apollo-server-core';
// import express from 'express';
// import http, { createServer } from 'http';
// import { WebSocketServer } from 'ws';
// import { useServer } from 'graphql-ws/lib/use/ws';
// import { messages } from './db.js';
// import { PubSub } from 'graphql-subscriptions';
// import { makeExecutableSchema } from "@graphql-tools/schema";



// async function startApolloServer() {

//   const pubsub = new PubSub();

    // const typeDefs = gql`
    // type Message {
    //     id: String!
    //     user: String!
    //     content: String!
    // }

    // type Query {
    //     message(id: String!): Message!
    //     messages: [Message!]!
    // }

    // type Mutation {
    //     postMessage(user: String!, content: String!): ID!
    //     deleteMessage(id: String!): Message!
    // }
    // type Subscription {
    //     messages: [Message!]!
    // }
    //   `
    // const resolvers = {
    //     Query: {
    //         message: (parent, { id }, context, info) => {
    //           return messages.find(message => message.id == id);
    //         },
    //         messages: (parent, args, context, info) => {
    //           return messages;
    //         },
    //       },
        
    //       Mutation: {
    //         postMessage: (parent, { user, content }, context, info) => {
    //           const id = messages.length;
    //           messages.push({ id, user, content });
    //           pubsub.publish('POST_CREATED', { messages });
    //           return id;
    //         },
    //         deleteMessage: (parent, { id }, context, info) => {
    //           const messageIndex = messages.findIndex(message => message.id == id);
        
    //           if (messageIndex === -1) throw new Error('Message not found.');
        
    //           const deletedMessages = messages.splice(messageIndex, 1);
        
    //           return deletedMessages[0];
    //         },
    //       },
    //       Subscription: {
    //         messages: (parent, args, context, info) => {
    //             return pubsub.asyncIterator('POST_CREATED');
    //           },
    //       }
    // }

//     const schema = makeExecutableSchema({ typeDefs, resolvers });

//     const app = express();

//     const httpServer = createServer(app);

//     const wsServer = new WebSocketServer({
//         server: httpServer,
//         path: '/subscriptions',
//       });  

//     const serverCleanup = useServer(schema, wsServer);

//     const server = new ApolloServer({
//         schema,
//         plugins: [
//           // Proper shutdown for the HTTP server.
//           ApolloServerPluginDrainHttpServer({ httpServer }),
      
//           // Proper shutdown for the WebSocket server.
//           {
//             async serverWillStart() {
//               return {
//                 async drainServer() {
//                   await serverCleanup.dispose();
//                 },
//               };
//             },
//           },
//         ],
//       });

    

//     await server.start();

//     server.applyMiddleware({ app });

//     await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

//     console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// }

// startApolloServer();

import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { PubSub } from "graphql-subscriptions";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { messages } from './db.js';

const PORT = 4000;
const pubsub = new PubSub();
pubsub.publish('POST_CREATED', { newMessages: messages });


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
        },
      },
    
      Mutation: {
        postMessage: (parent, { user, content }, context, info) => {
          const id = messages.length;
          messages.push({ id, user, content });
          pubsub.publish('POST_CREATED', { newMessages: messages });
          return id;
        },
        deleteMessage: (parent, { id }, context, info) => {
          const messageIndex = messages.findIndex(message => message.id == id);
    
          if (messageIndex === -1) throw new Error('Message not found.');
    
          const deletedMessages = messages.splice(messageIndex, 1);
    
          return deletedMessages[0];
        },
      },
      Subscription: {
        newMessages: {
          subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
        },
      },
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
  path: "/graphql",
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
          },
        };
      },
    },
  ],
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

// In the background, increment a number every second and notify subscribers when
// it changes.
let currentNumber = 0;
function incrementNumber() {
  currentNumber++;
  pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumber });
  setTimeout(incrementNumber, 1000);
}
// Start incrementing
incrementNumber();
