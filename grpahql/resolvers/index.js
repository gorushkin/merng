import postResolvers from './posts.js';
import userResolvers from './users.js';

export default {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation
  }
};
