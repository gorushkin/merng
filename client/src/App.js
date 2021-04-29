import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';
import Menubar from './components/Menubar';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './context/auth';
import { AuthRoute } from './utils/AuthRoute';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

const App = () => {

  return (
    <AuthProvider>
      <Router>
        <Container>
          <Menubar />
          <Route exact path='/' component={Home} />
          <AuthRoute exact path='/login' component={Login} />
          <AuthRoute exact path='/register' component={Register} />
          <Route path='/posts/:postId' component={Post} />
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
