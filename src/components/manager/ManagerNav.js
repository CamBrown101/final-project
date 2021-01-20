import { NavLink } from 'react-router-dom';

import './ManagerNav.scss';

export default function Nav(props) {
  return (
    <nav id="manager-nav-bar">
      <nav id="manager-nav-menu">
        <NavLink
          className="nav-menu-item"
          id="nav-menu-employees"
          exact
          to="/manager/employees">
          Employees
        </NavLink>
        <NavLink
          className="nav-menu-item"
          id="nav-menu-create-item"
          exact
          to="/manager/create-menu-item">
          Create Menu Item
        </NavLink>
        <NavLink
          className="nav-menu-item"
          id="nav-menu-create-category"
          exact
          to="/manager/create-category">
          Create Category
        </NavLink>
        <NavLink
          className="nav-menu-item"
          id="nav-menu-analytics"
          exact
          to="/manager/analytics">
          Analytics
        </NavLink>
      </nav>
    </nav>
  );
}
