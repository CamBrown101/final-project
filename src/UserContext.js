import React, { createContext, useState } from 'react';
// import Axios from 'axios';

// Create context with an empty object
const UserContext = createContext({ name: '', auth: false });

// Provide Context add things here to make them global
const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ name: '', auth: false });

  // Login updates the user data with a name parameter
  const login = (code) => {
    const pin = code;

    // Axios.get('ht/login', pin).then((res) => {
    //   console.log(res);
    // });
    setUser((user) => ({
      name: code,
      auth: true,
    }));
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
