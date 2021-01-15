import { NavLink } from 'react-router-dom';

import './ManagerNav.scss';

export default function Nav(props) {
  return (
    <nav id="manager-nav-bar">
      <nav id="manager-nav-menu">
        <NavLink
          className="nav-menu-item"
          id="nav-menu-create-employee"
          exact
          to="/manager/create-employee"
        >
          Create Employee
        </NavLink>
        <NavLink
          className="nav-menu-item"
          id="nav-menu-create-item"
          exact
          to="/manager/create-menu-item"
        >
          Create Menu Item
        </NavLink>
        <NavLink
          className="nav-menu-item"
          id="nav-menu-create-category"
          exact
          to="/manager/create-category"
        >
          Create Category
        </NavLink>
      </nav>
    </nav>
  );
}
