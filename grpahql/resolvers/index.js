import postResolvers from './posts.js';

export default {
  Query: {
    ...postResolvers.Query,
  },
};
