import apolloServer from 'apollo-server';
const { AuthenticationError, UserInputError } = apolloServer;
import { Post } from '../../models/Post.js';
import checkAuth from '../../utils/check-auth.js';

export default {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      const { username } = checkAuth(context);

      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body can not be empty',
          },
        });
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError('Post is not found');
      }
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = checkAuth(context);

      try {
        const post = await Post.findById(postId);

        if (post) {
          const { comments } = post;
          const comment = comments.find((item) => item.id === commentId);
          const updatedComments = comments.filter((item) => item.id !== commentId);
          if (username === post.username && username === comment.username) {
            post.comments = updatedComments;
            await post.save();
            return post;
          } else {
            throw new AuthenticationError('You can not do it!!!');
          }
        } else {
          throw new UserInputError('Post is not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },

  },
};
