import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
};

if (localStorage.getItem('token')) {
  const token = jwtDecode(localStorage.getItem('token'));

  if (token.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.user = token
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: (data) => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    dispatch({
      type: 'LOGIN',
      payload: data,
    });
  };

  const logout = (data) => {
    localStorage.removeItem('token');
    dispatch({
      type: 'LOGOUT',
    });
  };

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
};

export { AuthContext, AuthProvider };
