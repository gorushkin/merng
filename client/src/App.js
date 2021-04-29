import React, { useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Menubar from './components/Menubar';
import { Container } from 'semantic-ui-react';
import { AuthProvider, AuthContext } from './context/auth';
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
        </Container>
      </Router>
    </AuthProvider>
  );
};

export default App;
