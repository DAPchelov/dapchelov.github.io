import { messages } from './db';
const { PubSub, withFilter } = require("graphql-yoga");

const pubsub = new PubSub();

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

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
      subscribe: (parent, args, {pubsub}) => {
        const channel = Math.random().toString(36).slice(2,15);
        onMessagesUpdates(() => pubsub.publish(channel, { messages }));
        setTimeout(() => pubsub.publish(channel, { messages }), 0);
        return pubsub.asyncIterator(channel);
      }
    }
  }
};

export default resolvers;
