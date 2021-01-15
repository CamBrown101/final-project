import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import './Nav.scss';
import { UserContext } from '../UserContext';
import userEvent from '@testing-library/user-event';

export default function Nav(props) {
  const { user } = useContext(UserContext);

  return (
    <nav id="nav-bar">
      {user.auth ? (
        <nav id="nav-menu">
          <NavLink className="nav-menu-item" id="nav-menu-home" exact to="/">
            Home
          </NavLink>
          <NavLink
            className="nav-menu-item"
            id="nav-menu-home"
            exact
            to="/login"
          >
            Login
          </NavLink>

          <NavLink
            className="nav-menu-item"
            id="nav-menu-home"
            exact
            to="/menu"
          >
            Menu
          </NavLink>
        </nav>
      ) : null}
    </nav>
  );
}
