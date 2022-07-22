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

const UserTasksSchema = new Schema({
  UUID: {
    type: String,
    required: true,
  },
  tasks: [{
    id: {
      type: String,
      required: true,
    },
    complete: {
      type: Boolean,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  }],

});

const mongooseUserTasks = mongoose.model("Task", UserTasksSchema);

// Set up server
let users = [];
let tasks = [];

const PORT = 4000;
const pubsub = new PubSub();

// Schema definition
const typeDefs = gql`
  type User {
    _id: ID!
    login: String!
    password: String!
  }

  type Task {
    id: String!
    complete: Boolean!
    content: String!
  }

  type UserTasks {
    UUID: ID!
    tasks: [Task!]!
  }

  type Query {
    user(login: String! password: String!): User!
    users: [User!]!
    tasks(UUID: ID!): [Task!]!
  }

  type Mutation {
    postTask(UUID: String!, content: String!): ID!
    # deleteMessage(id: ID!): Message!
  }
  type Subscription {
    newTasks(UUID: String!): [Task!]!
  }
`;

// Resolver map
const resolvers = {
  Query: {
    user: (parent, { login, password }, context, info) => {
      // returns userObject, filtered users array from DB by login and found one by password
      // errors not handled!
      return users.filter(user => user.login == login).find(user => user.password == password);
    },
    users: (parent, args, context, info) => {
      return users;
    },
    tasks: (parent, { UUID }, context, info) => {
      console.log(tasks);
      return tasks.find(tasksArray => tasksArray.UUID == UUID).tasks
    },
  },

  Mutation: {
    postTask: (parent, { UUID, content }, context, info) => {
      const userTasks = tasks.find(tasksArray => tasksArray.UUID == UUID).tasks;
      const taskNumber = userTasks.length;

      //push message to MongoDB
      const tasks = new mongooseUserTasks({
        UUID: UUID,
        tasks: [...userTasks,
        {
          id: taskNumber,
          complete: false,
          content: content
        }],
      });
      tasks
        .save()
        .then(result => {
          userTasks.push(result);
          pubsub.publish(`TASK_CREATED${UUID}`, { newTasks: tasks });
        })
        .catch(error => {
          console.log(error);
          throw error;
        });
      return taskNumber;
    }
    // deleteMessage: (parent, { id }, context, info) => {
    //   const messageIndex = messages.findIndex(message => message.id == id);

    //   if (messageIndex === -1) throw new Error("Message not found.");

    //   const deletedMessages = messages.splice(messageIndex, 1);

    //   return deletedMessages[0];
    // }
  },
  Subscription: {
    newTasks: {
      subscribe: (parent, { UUID }, context, info) => {
        const tasks = pubsub.asyncIterator([`TASK_CREATED${UUID}`]);
        console.log(tasks);
        return (tasks);
      }
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
const mongoUriPullData = `mongodb+srv://simpledb:simpledbpassword@cluster0.qfdf4.mongodb.net/Todo?proxyHost=192.168.1.100&proxyPort=9050`;
const mongoUriDB = `mongodb+srv://simpledb:simpledbpassword@cluster0.qfdf4.mongodb.net/test?proxyHost=192.168.1.100&proxyPort=9050`;

const mongoDBClient = new MongoClient(mongoUriDB);
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
    const db = mongoDBClient.db("Todo");
    const usersCollection = db.collection("users");
    const tasksCollection = db.collection("tasks");
    // find code goes here
    const usersCursor = usersCollection.find();
    const tasksCursor = tasksCollection.find();
    // iterate code goes here
    users.length = 0;
    tasks.length = 0;

    await usersCursor.forEach(element => users.push(element));
    await tasksCursor.forEach(element => tasks.push(element));

  } finally {
    // Ensures that the client will close when you finish/error
    await mongoDBClient.close();
  }
};
reFillLocalStorage().catch(console.dir);

await server.start();

const corsOptions = {
  origin: ["http://localhost:3000", "https://studio.apollographql.com"]
};

server.applyMiddleware({ app, cors: corsOptions });

// Now that our HTTP server is fully set up, actually listen.
httpServer.listen(PORT, () => {
  console.log(
    `🚀 Query endpoint ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${PORT}${server.graphqlPath}`
  );
});
