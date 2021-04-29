import React, { useState } from 'react';
import { Icon, Confirm, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY, DELETE_COMMENT_MUTATION } from '../utils/graphql';

const DeleteButton = ({ callback, postId, commentId = null }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePost] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        const getPosts = data.getPosts.filter((item) => item.id !== postId);
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { getPosts } });
        setShowConfirm(false);
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
  });

  return (
    <>
      <Button floated='right' color='red' as='div' onClick={() => setShowConfirm(true)}>
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>
      <Confirm open={showConfirm} onCancel={() => setShowConfirm(false)} onConfirm={deletePost} />
    </>
  );
};

export default DeleteButton;
