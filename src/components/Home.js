import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';
import MenuContainer from './menu/MenuContainer';
import BillContainer from './bill/BillContainer';
import TableContainer from './TableContainer';
import Axios from 'axios';

import './Home.scss';

export default function Home() {
  const { user, logout } = useContext(UserContext);
  const [menu, setMenu] = useState([]);
  const [bill, setBill] = useState([]);
  console.log(bill);
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
      <div class="home-main">
        <h1>Hello, {user.name}!</h1>
        <button onClick={logout}>Logout</button>
        <BillContainer bill={bill} />
        <MenuContainer menu={menu} setBill={setBill} bill={bill} />
        <TableContainer tables={tables} />
      </div>
    </div>
  );
}
