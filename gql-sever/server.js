import { createServer } from '@graphql-yoga/node'
import { PubSub } from 'graphql-subscriptions'
import { messages } from './db.js';

const pubsub = new PubSub();
const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

const server = createServer({
    schema: {
        typeDefs: /* GraphQL */ `
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
        messages: [Message!]!
    }
      `,
        resolvers: {
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
            
                  subscribers.forEach(fn => fn());
            
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
                messages: {
                  subscribe: (parent, args) => {
                    const channel = Math.random().toString(36).slice(2,15);
                    onMessagesUpdates(() => pubsub.publish(channel, { messages }));
                    setTimeout(() => pubsub.publish(channel, { messages }), 0);
                    return pubsub.asyncIterator(channel);
                  }
                }
              }
        },
    },
})

server.start(({ port }) => {
    console.log(`Server on http://localhost:${port}/`)
})