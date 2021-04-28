import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import Postcard from '../components/Postcard';
import { AuthContext } from '../context/auth';

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1 className='page-title'>Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts ...</h1>
        ) : (
          data &&
          data.getPosts.map((item) => (
            <Grid.Column key={item.id} style={{ marginBottom: '1rem' }}>
              <Postcard post={item} />
            </Grid.Column>
          ))
        )}
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
