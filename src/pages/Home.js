import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition, Dimmer, Loader } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { user } = useContext(AuthContext);
  const {
    loading,
    data: { getPosts: posts }
  } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
        {user && (
          <Grid.Row centered columns={1}>
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          </Grid.Row>
        )}
        {loading ? (
          <Dimmer active>
            <Loader content='Loading' />
          </Dimmer>
        ) : (
          <Transition.Group>
            <Grid.Row centered columns={2}>
            {posts &&
              posts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <PostCard post={post} />
                  </Grid.Column>
              ))}
            </Grid.Row>
          </Transition.Group>
        )}
    </Grid>
  );
}

export default Home;
