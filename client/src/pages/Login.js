import React, { useState, useContext } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

const Login = (props) => {
  const [errors, setErrors] = useState([]);
  const { login } = useContext(AuthContext);

  const initialState = {
    username: '',
    password: '',
  };

  const { onChange, values, onSubmit } = useForm(loginUserCb, initialState);

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      login(result.data.login);
      props.history.push('/');
    },
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.exception.errors),
    variables: values,
  });

  function loginUserCb() {
    loginUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label='Username'
          name='username'
          onChange={onChange}
          value={values.username}
          placeholder='Username'
          type='text'
          error={!!errors.username}
        />
        <Form.Input
          label='Password'
          name='password'
          onChange={onChange}
          value={values.password}
          placeholder='Password'
          type='password'
          error={!!errors.password}
        />
        <Button type='submit' primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='lsit'>
            {Object.values(errors).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      id
      createdAt
      token
    }
  }
`;

export default Login;
