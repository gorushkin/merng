import React, { useContext } from 'react';
import { Label, Icon, Button, Card, Image } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton.jsx';

const Postcard = ({
  post: { id, body, username, createdAt, likeCount, likes, comments, commentCount },
}) => {
  const { user } = useContext(AuthContext);

  const onRemoveCLickHandler = () => {
    console.log('onRemoveCLickHandler');
  };

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow()}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{id, likes, likeCount}}  />
        <Button labelPosition='right' as={Link} to={`/post/${id}`}>
          <Button color='blue' basic>
            <Icon name='comments' />
          </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
        {user && user.username === username && (
          <Button floated='right' color='red' as='div' onClick={onRemoveCLickHandler}>
            <Icon name='trash' style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default Postcard;
