import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid, Image } from 'semantic-ui-react';
// import graphql from 'graphql';

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  console.log('data: ', data);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1>Posts</h1>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Image src='/images/wireframe/media-paragraph.png' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
      }
    }
  }
`;

export default Home;
