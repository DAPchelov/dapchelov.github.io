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
import {v4 as uuidv4} from 'uuid';

// Create mongoose model
// const Schema = mongoose.Schema;

// const UserTasksSchema = new Schema({
//   login: {
//     type: String,
//     required: true,
//   },
//   tasks: [{
//     id: {
//       type: String,
//       required: true,
//     },
//     complete: {
//       type: Boolean,
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//   }],

// });

// const mongooseUserTasks = mongoose.model("Task", UserTasksSchema);

// Set up server
let users = [];
let tasks = [];

// Connect to MongoDB
const mongoUriPushData = `mongodb+srv://simpledb:simpledbpassword@cluster0.qfdf4.mongodb.net/Todo?proxyHost=192.168.1.100&proxyPort=9050`;
const mongoUriDB = `mongodb+srv://simpledb:simpledbpassword@cluster0.qfdf4.mongodb.net/test?proxyHost=192.168.1.100&proxyPort=9050`;

const mongoDBClient = new MongoClient(mongoUriDB);
mongoose
  .connect(mongoUriPushData)
  .then(() => {
    console.log("Mongoose client connect sucsessful");
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

const pushTaskToTasksDocument = async (UUID, content, id) => {
  await mongoDBClient.connect();
  const db = mongoDBClient.db("Todo");
  const tasksCollection = db.collection("tasks");

  await tasksCollection.updateOne(
    { UUID: `${UUID}` },
    {
      $push: {
        tasks: {
          id: id,
          complete: false,
          content: content
        }
      }
    }
  ).then(() => {
    reFillLocalStorage().catch(console.dir).then(() => {
      pubsub.publish(`TASKS_UPDATE${UUID}`, { newTasks: tasks.find(usersTasksArray => usersTasksArray.UUID == UUID).tasks });
      mongoDBClient.close();
    });
  });
}
const createNewTasksDocument = async (UUID) => {
  await mongoDBClient.connect();
  const db = mongoDBClient.db("Todo");
  const tasksCollection = db.collection("tasks");

  await tasksCollection.insertOne({
    "UUID": `${UUID}`,
    tasks: []
  }).then(async () => {
    await reFillLocalStorage().catch(console.dir);
    await mongoDBClient.close()
  })
}

const pushNewUserToDB = async (userLogin, userPassword) => {
  await mongoDBClient.connect();
  const db = mongoDBClient.db("Todo");
  const usersCollection = db.collection("users");

  await usersCollection.insertOne({
    login: userLogin,
    password: userPassword,
  }).then(async () => {
    await reFillLocalStorage().catch(console.dir);
    await mongoDBClient.close()
  })

  const userID = users.find(user => user.login === userLogin)._id

  await createNewTasksDocument(userID);

  return (userID);
}

const switchTaskComplete = async (UUID, taskID, taskComplete) => {
  await mongoDBClient.connect();
  const db = mongoDBClient.db("Todo");
  const tasksCollection = db.collection("tasks");

  await tasksCollection.updateOne(
    {
      UUID: `${UUID}`, "tasks.id": taskID
    },
    {
      $set: {"tasks.$.complete": taskComplete}
    }
  ).then(() => {
    reFillLocalStorage().catch(console.dir).then(() => {
      mongoDBClient.close();
      console.log("Switch", `UUID:${UUID}`, `id:${taskID}`, `status:${taskComplete}`);
    });
  });
}

const clearCompletedTasks = async (UUID) => {
  await mongoDBClient.connect();
  const db = mongoDBClient.db("Todo");
  const tasksCollection = db.collection("tasks");

  await tasksCollection.updateOne(
    {
      UUID: `${UUID}`
    },
    {
      $pull: {tasks: {complete: {$eq: true}}}
    }
  ).then(() => {
    reFillLocalStorage().catch(console.dir).then(() => {
      mongoDBClient.close();
      console.log("Clear", `UUID:${UUID}`);
    });
  });

}

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
    user(userLogin: String! userPassword: String!): User!
    users: [User!]!
    tasks(UUID: ID!): [Task!]!
  }

  type Mutation {
    postTask(UUID: String!, content: String!): ID!
    newUserUUID(userLogin: String!, userPassword: String!): ID!
    switchComplete(UUID: String!, taskID: String!): Boolean
    clearCompleted(UUID: String!): Boolean
  }
  type Subscription {
    newTasks(UUID: String!): [Task!]!

  }
`;

// Resolver map
const resolvers = {
  Query: {
    user: (parent, { userLogin, userPassword }, context, info) => {
      // returns userObject, filtered users array from DB by login and found one by password
      return users.filter(user => user.login === userLogin).find(user => user.password === userPassword);
    },
    users: (parent, args, context, info) => {
      return users;
    },
    tasks: (parent, { UUID }, context, info) => {
      return tasks.find(tasksArray => tasksArray.UUID == UUID).tasks
    },
  },

  Mutation: {
    postTask: (parent, { UUID, content }, context, info) => {
      const taskUUID = uuidv4();
      pushTaskToTasksDocument(UUID, content, taskUUID);
      return taskUUID;
    },
    newUserUUID: (parent, { userLogin, userPassword }, context, info) => {
      const existingUser = users.filter(user => user.login === userLogin).find(user => user.password === userPassword);
      if (existingUser) {
        return (existingUser._id);
      }
      return (pushNewUserToDB(userLogin, userPassword));
    },
    switchComplete: (parent, { UUID, taskID }, context, info) => {
      //invert task complete state
      const taskCompleteState = tasks.find(usersTasksArray => usersTasksArray.UUID === UUID).tasks.find(task => task.id === taskID).complete;
      tasks.find(usersTasksArray => usersTasksArray.UUID === UUID).tasks.find(task => task.id === taskID).complete = !taskCompleteState;

      switchTaskComplete(UUID, taskID, !taskCompleteState);
      pubsub.publish(`TASKS_UPDATE${UUID}`, { newTasks: tasks.find(usersTasksArray => usersTasksArray.UUID == UUID).tasks });
    },
    clearCompleted: (parent, { UUID }, context, info) => {
      clearCompletedTasks(UUID);
      tasks.find(usersTasksArray => usersTasksArray.UUID == UUID).tasks = tasks.find(usersTasksArray => usersTasksArray.UUID == UUID).tasks.filter(task => task.complete !== true);
      pubsub.publish(`TASKS_UPDATE${UUID}`, { newTasks: tasks.find(usersTasksArray => usersTasksArray.UUID == UUID).tasks });
    }
  },
  Subscription: {
    newTasks: {
      subscribe: (parent, { UUID }, context, info) => {
        const tasks = pubsub.asyncIterator([`TASKS_UPDATE${UUID}`]);
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
