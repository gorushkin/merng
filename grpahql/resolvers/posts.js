
import apolloServer from 'apollo-server';
const { AuthenticationError } = apolloServer;
import { Post } from '../../models/Post.js';
import checkAuth from '../../utils/check-auth.js';

export default {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      console.log('user: ', user);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return 'Post deleted succesfully';
        } else {
          throw new AuthenticationError('You can not delete this post');
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
