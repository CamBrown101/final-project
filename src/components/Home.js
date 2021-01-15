import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';
import MenuContainer from './menu/MenuContainer';
import BillContainer from './bill/BillContainer';
import Axios from 'axios';

export default function Home() {
  const { user, logout } = useContext(UserContext);
  const [menu, setMenu] = useState([]);
  const [bill, setBill] = useState([]);
  console.log(bill);
  useEffect(() => {
    Axios.get('/api/menu').then((res) => {
      setMenu(res.data);
    });
  }, []);

  if (!user.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Hello, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
      <BillContainer bill={bill} />
      <MenuContainer menu={menu} setBill={setBill} bill={bill} />
    </div>
  );
}
