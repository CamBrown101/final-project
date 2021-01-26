import { NavLink } from 'react-router-dom';

import './ManagerNav.scss';

export default function Nav(props) {
  return (
    <nav id="manager-nav-bar">
      <nav id="manager-nav-menu">
        <NavLink
          className="nav-menu-item"
          id="nav-menu-employees"
          activeClassName="selectedLink"
          exact
          to="/manager/employees">
          Employees
        </NavLink>
        <NavLink
          className="nav-menu-item"
          id="nav-menu-create-item"
          activeClassName="selectedLink"
          exact
          to="/manager/create-menu-item">
          Create Menu Item
        </NavLink>
        <NavLink
          className="nav-menu-item"
          id="nav-menu-create-category"
          activeClassName="selectedLink"
          exact
          to="/manager/create-category">
          Create Category
        </NavLink>
        <NavLink
          className="nav-menu-item"
          id="nav-menu-analytics"
          activeClassName="selectedLink"
          exact
          to="/manager/analytics">
          Analytics
        </NavLink>
      </nav>
    </nav>
  );
}
