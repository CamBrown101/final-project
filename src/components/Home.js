import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';
import MenuContainer from './menu/MenuContainer';
import BillContainer from './bill/BillContainer';
import TableContainer from './TableContainer';
import Axios from 'axios';

import './Home.scss';

export default function Home(props) {
  const { user, logout } = useContext(UserContext);
  const [menu, setMenu] = useState([]);

  const [tables, setTables] = useState([]);
  const [table, setTable] = useState([]);

  useEffect(() => {
    Axios.get('/api/menu').then((res) => {
      setMenu(res.data);
    });
    Axios.get('/api/tables').then((res) => {
      setTables(res.data);
    });
  }, []);

  if (!user.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div className="home-main">
        <h1>Hello, {user.name}!</h1>
        <button onClick={logout}>Logout</button>
        <BillContainer
          bill={props.bill}
          tableInfo={table}
          menu={menu}
          setBill={props.setBill}
        />
        <MenuContainer menu={menu} setBill={props.setBill} bill={props.bill} />
        <TableContainer tables={tables} setTable={setTable} />
      </div>
    </div>
  );
}
