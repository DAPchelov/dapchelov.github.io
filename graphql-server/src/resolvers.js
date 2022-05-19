import { messages } from './db';

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

      return id;
    },
    deleteMessage: (parent, { id }, context, info) => {
      const messageIndex = messages.findIndex(message => message.id == id);

      if (messageIndex === -1) throw new Error('Message not found.');

      const deletedMessages = users.splice(messageIndex, 1);

      return deletedMessages[0];
    },
  },
};

export default resolvers;
