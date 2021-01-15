import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Redirect } from "react-router-dom";
import MenuContainer from "./MenuContainer";
import TableContainer from "./TableContainer";
import Axios from "axios";
import "./Home.scss";

export default function Home() {
  const { user, logout } = useContext(UserContext);
  const [menu, setMenu] = useState([]);
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState(null);

  useEffect(() => {
    Axios.get("/api/menu").then((res) => {
      setMenu(res.data);
    });
    Axios.get("/api/tables").then((res) => {
      setTables(res.data);
    });
  }, []);

  if (!user.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Hello, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
      <div class="home-main">
        <TableContainer tables={tables} setTable={setTable} />
        <MenuContainer menu={menu} />
      </div>
    </div>
  );
}
