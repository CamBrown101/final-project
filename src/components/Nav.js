import { NavLink } from 'react-router-dom';
import './Nav.scss';

export default function Nav(props) {
  return (
    <nav id="nav-bar">
      <nav id="nav-menu">
        <NavLink className="nav-menu-item" id="nav-menu-home" exact to="/">
          Home
        </NavLink>
        <NavLink className="nav-menu-item" id="nav-menu-home" exact to="/login">
          Login
        </NavLink>

        <NavLink className="nav-menu-item" id="nav-menu-home" exact to="/menu">
          Menu
        </NavLink>
      </nav>
    </nav>
  );
}
