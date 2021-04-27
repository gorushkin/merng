import jwt from 'jsonwebtoken';
import apolloServer from 'apollo-server';
const { AuthenticationError } = apolloServer;

export default (context) => {
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET);
        return user;
      } catch (error) {
        throw new AuthenticationError('Invalid/Expired toke');
      }
    }
    throw new Error("Authentification token must be  'Bearer [token]");
  }
  throw new Error('Authentification token must be  provided');
};
