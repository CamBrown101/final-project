import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';

export default function Home() {
  const { user, logout } = useContext(UserContext);
  if (!user.auth) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <h1>Hello, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}
