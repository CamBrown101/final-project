import React, { createContext, useState } from 'react';
import Axios from './helpers/axios';

// Create context with an empty object
const UserContext = createContext({ name: '', id: 0, auth: false });

// Provide Context add things here to make them global
const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ name: '', id: 0, auth: false });

  // Login updates the user data with a name parameter
  const login = (code) => {
    const data = { pin: code };

    Axios.post('/login', data).then((res) => {
      if (res.data) {
        setUser((user) => ({
          name: `${res.data.firstname} ${res.data.lastname}`,
          auth: true,
          id: res.data.id,
          isAdmin: res.data.is_admin,
        }));
      } else {
        window.alert('Invalid Login');
      }
    });
  };

  // Logout updates the user data to empty
  const logout = () => {
    setUser((user) => ({
      name: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
