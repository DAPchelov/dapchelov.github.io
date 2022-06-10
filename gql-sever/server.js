import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { PubSub } from "graphql-subscriptions";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";

// Create mongoose model
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

const mongooseMessage = mongoose.model("Message", messageSchema);

// Set up server
let messages = [];
let users = [];

const PORT = 4000;
const pubsub = new PubSub();

// Schema definition
const typeDefs = gql`
  type Message {
    _id: ID!
    user: String!
    content: String!
  }
  type User {
    _id: ID!
    userLogin: String!
    userPassword: String!
  }

  type Query {
    message(id: ID!): Message!
    messages: [Message!]!
  }

  type Mutation {
    postMessage(postUser: String!, postContent: String!): ID!
    # deleteMessage(id: ID!): Message!
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
    // userID: (parent, { login }, context, info) => {
    //   user = users.find(user => user.userLogin == login);
    // }
  },

  Mutation: {
    postMessage: (parent, { postUser, postContent }, context, info) => {
      const messageNumber = messages.length;

      //push message to MongoDB
      const message = new mongooseMessage({
        user: postUser,
        content: postContent
      });
      message
        .save()
        .then(result => {
          messages.push(result);
          pubsub.publish("POST_CREATED", { newMessages: messages });
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
      return messageNumber;
    }
    // deleteMessage: (parent, { id }, context, info) => {
    //   const messageIndex = messages.findIndex(message => message.id == id);

    //   if (messageIndex === -1) throw new Error("Message not found.");

    //   const deletedMessages = messages.splice(messageIndex, 1);

    //   return deletedMessages[0];
    // }
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

// Connect to MongoDB
const mongoUriPullData = `mongodb+srv://simpledb:simpledbpassword@cluster0.qfdf4.mongodb.net/messages-simple-chat?proxyHost=192.168.1.100&proxyPort=9050`;
const mongoUriPushData = `mongodb+srv://simpledb:simpledbpassword@cluster0.qfdf4.mongodb.net/test?proxyHost=192.168.1.100&proxyPort=9050`;

const mongoDBClient = new MongoClient(mongoUriPushData);
mongoose
  .connect(mongoUriPullData)
  .then(() => {
    console.log("MongoDB connect sucsessful");
  })
  .catch(error => {
    console.log(error);
  });

const reFillLocalStorage = async () => {
  try {
    await mongoDBClient.connect();
    // database and collection code goes here
    const db = mongoDBClient.db("messages-simple-chat");
    const coll = db.collection("messages");
    // find code goes here
    const cursor = coll.find();
    // iterate code goes here
    messages.length = 0;
    await cursor.forEach(element => messages.push(element));
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoDBClient.close();
  }
};
reFillLocalStorage().catch(console.dir);

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
