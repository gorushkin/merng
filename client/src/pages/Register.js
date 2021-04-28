import React, { useState, useContext } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

const Register = (props) => {
  const [errors, setErrors] = useState([]);
  const { user, login } = useContext(AuthContext);

  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  };

  const { onChange, values, onSubmit } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      props.history.push('/');
      login(result.data.register);
    },
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.exception.errors),
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <h1>Register</h1>
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
          label='Email'
          name='email'
          onChange={onChange}
          value={values.email}
          placeholder='Email'
          type='text'
          error={!!errors.email}
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
        <Form.Input
          label='Repeat password'
          name='confirmPassword'
          onChange={onChange}
          value={values.confirmPassword}
          placeholder='Repeat password'
          type='password'
          error={!!errors.confirmPassword}
        />
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit' primary>
          Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $password: String!
    $confirmPassword: String!
    $email: String!
  ) {
    register(
      registerInput: {
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        email: $email
      }
    ) {
      username
      id
      createdAt
      token
    }
  }
`;

export default Register;
