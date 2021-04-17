import apollo from 'apollo-server';
import mongoose from 'mongoose';
import { typeDefs } from './grpahql/typeDefs.js';
import { resolvers } from './grpahql/resolvers.js';

import dotenv from 'dotenv';

dotenv.config();

import { Post } from './models/Post.js';
// import { User } from './models/User';

const { ApolloServer } = apollo;



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
