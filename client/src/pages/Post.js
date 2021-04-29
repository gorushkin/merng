import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Card, Image, Button, Icon, Label } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { FETCH_POST_QUERY } from '../utils/graphql';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

const Post = () => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: { postId },
  });

  if (!data) {
    return <h1>loading...</h1>;
  }

  const { id, body, createdAt, username, likes, likeCount, commentCount } = data.getPost;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            floated='right'
            size='small'
            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content>
              <LikeButton user={user} post={{ id, likes, likeCount }} />
              <Button as='div' labelPosition='right' onClick={() => console.log('comment')}>
                <Button basic color='blue'>
                  <Icon name='comments' />
                </Button>
                <Label basic color='blue' pointing='left'>
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton callback={() => history.push('/')} postId={id} />
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Post;
