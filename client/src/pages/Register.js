import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

const Register = (props) => {
  const [errors, setErrors] = useState([]);
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
      props.history.push('/')
    },
    onError: (error) => setErrors(error.graphQLErrors[0].extensions.exception.errors),
    variables: values,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  const onChangeHandler = (e) => {
    setValues((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
        <Form.Input
          label='Username'
          name='username'
          onChange={onChangeHandler}
          value={values.username}
          placeholder='Username'
          type='text'
          error={!!errors.username}
        />
        <Form.Input
          label='Email'
          name='email'
          onChange={onChangeHandler}
          value={values.email}
          placeholder='Email'
          type='text'
          error={!!errors.email}
        />
        <Form.Input
          label='Password'
          name='password'
          onChange={onChangeHandler}
          value={values.password}
          placeholder='Password'
          type='password'
          error={!!errors.password}
        />
        <Form.Input
          label='Repeat password'
          name='confirmPassword'
          onChange={onChangeHandler}
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
