import React, { useEffect, useState } from 'react';
import { Label, Icon, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { LIKE_POST_MUTATION } from '../utils/graphql';
import { Link } from 'react-router-dom';

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color='teal'>
        <Icon name='heart' />
      </Button>
    ) : (
      <Button color='teal' basic>
        <Icon name='heart' />
      </Button>
    )
  ) : (
    <Button as={Link} to={'/login'} color='teal' basic>
      <Icon name='heart' />
    </Button>
  );

  return (
    <Button as='div' labelPosition='right' onClick={likePost}>
      {likeButton}
      <Label as='a' basic color='teal' pointing='left'>
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
