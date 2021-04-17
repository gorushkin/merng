import apollo from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

import { Post } from './models/Post.js';
// import { User } from './models/User';

const { ApolloServer } = apollo;

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const port = 5000;

const startServer = () => {
  server.listen({ port }).then((res) => {
    console.log(`Server is running at port ${port}, ${res.url}`);
  });
};

mongoose
  .connect(process.env.DB_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(startServer)
  .catch((err) => {
    console.log(err);
  });
