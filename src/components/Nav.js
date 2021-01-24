import { NavLink } from "react-router-dom";
import { useContext } from "react";

import "./Nav.scss";
import { UserContext } from "../UserContext";

export default function Nav(props) {
  const { user, logout } = useContext(UserContext);

  return (
    <nav id="nav-bar">
      {user.auth ? (
        <nav id="nav-menu">
          <div className="screens">
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
              to="/manager"
            >
              Manager
            </NavLink>
            <NavLink
              className="nav-menu-item"
              id="nav-menu-split"
              exact
              to="/timecard"
            >
              Clock In
            </NavLink>
            <NavLink
              className="nav-menu-item"
              id="nav-food-production"
              to={{
                pathname: "/food-production",
                is_food: true,
              }}
            >
              Food Production
            </NavLink>
            <NavLink
              className="nav-menu-item"
              id="nav-drink-production"
              to={{
                pathname: "/drink-production",
                is_food: false,
              }}
            >
              Drink Production
            </NavLink>
          </div>
          <div className="screens">
            <div className="logged-in">
              <h1>Hello, {user.name}!</h1>
            </div>
            <NavLink
              to={"/login"}
              id="nav-logout"
              className="nav-menu-item logout"
              onClick={logout}
            >
              Logout
            </NavLink>
          </div>
        </nav>
      ) : null}
    </nav>
  );
}
