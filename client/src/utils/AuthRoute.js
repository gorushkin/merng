import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { Redirect, Route } from 'react-router-dom';

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route {...rest} render={(props) => (user ? <Redirect to='/' /> : <Component {...props} />)} />
  );
};
