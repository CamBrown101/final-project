import { NavLink } from 'react-router-dom';
import { useContext } from 'react';

import './Nav.scss';
import { UserContext } from '../UserContext';

export default function Nav(props) {
  const { user } = useContext(UserContext);

  return (
    <nav id="nav-bar">
      {user.auth ? (
        <nav id="nav-menu">
          <NavLink
            className="nav-menu-item"
            id="nav-menu-home"
            exact
            to="/menu"
          >
            Menu
          </NavLink>
          <NavLink
            className="nav-menu-item"
            id="nav-menu-manager"
            exact
            to="/manager"
          >
            Manager
          </NavLink>
          <NavLink
            className="nav-menu-item"
            id="nav-menu-split"
            exact
            to="/split"
          >
            Split
          </NavLink>
          <NavLink
            className="nav-menu-item"
            id="nav-menu-split"
            exact
            to="/timecard"
          >
            Clock In
          </NavLink>
        </nav>
      ) : null}
    </nav>
  );
}
