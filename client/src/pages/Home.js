import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import Postcard from '../components/Postcard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  const { user } = useContext(AuthContext);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <h1 className='page-title'>Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
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

export default Home;
