import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { useMutation } from '@apollo/client';
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql';

const PostForm = () => {
  const { onChange, values, onSubmit } = useForm(creatPostCb, { body: '' });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update: (proxy, result) => {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: { ...data, getPosts } });
      values.body = '';
    },
    onError: (err) => console.log(err),
  });

  function creatPostCb() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create Form</h2>
      <Form.Field>
        <Form.Input value={values.body} name='body' onChange={onChange} placeholder='Hi world' />
        <Button type='submit' color='teal'>
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default PostForm;
