import { User } from '../../models/User.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import apolloServer from 'apollo-server';
import { validateLoginInput, validateRegisterInput } from '../../utils/validate.js';
const { UserInputError } = apolloServer;

export default {
  Mutation: {
    async login(parent, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User is no exist';
        throw new UserInputError('User not found', { errors });
      }

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const match = await bcryptjs.compare(password, user.password);

      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        process.env.SECRET,
        { expiresIn: '1h' }
      );

      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },
    async register(parent, { registerInput: { username, password, confirmPassword, email } }) {
      const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const hashPassword = await bcryptjs.hash(password, 12);

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
        password: hashPassword,
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
