import { User } from '../../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import apolloServer from 'apollo-server';
const  { UserInputError } =  apolloServer;

export default {
  Mutation: {
    async register(
      parent,
      { registerInput: { username, password, confirmPassword, email } },
    ) {
      password = await bcryptjs.hash(password, 12);

      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError('Username is taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        process.env.SECRET,
        { expiresIn: '1h' }
      );

      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
