import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/auth';

const MenuBar = () => {
  const { pathname } = useLocation();
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <Menu tabular pointing secondary size='massive' color='teal'>
      <Menu.Item name={user.username} active as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item onClick={logout} name='logout' />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu tabular pointing secondary size='massive' color='teal'>
      <Menu.Item name='home' active={pathname === '/'} as={Link} to='/' />
      <Menu.Menu position='right'>
        <Menu.Item name='login' active={pathname === '/login'} as={Link} to='/login' />
        <Menu.Item name='register' active={pathname === '/register'} as={Link} to='/register' />
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;
