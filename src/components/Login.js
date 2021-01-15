import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';

export default function Login() {
  const { user, login } = useContext(UserContext);
  const [code, setCode] = useState('');
  console.log(user);

  if (user.auth) {
    return <Redirect to="/" />;
  }

  const addNumber = (num) => {
    setCode(code + num);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <p>{code}</p>
      <button
        onClick={() => {
          addNumber('1');
        }}>
        1
      </button>
      <button
        onClick={() => {
          addNumber('2');
        }}>
        2
      </button>
      <button
        onClick={() => {
          addNumber('3');
        }}>
        3
      </button>
      <br />
      <button
        onClick={() => {
          addNumber('4');
        }}>
        4
      </button>
      <button
        onClick={() => {
          addNumber('5');
        }}>
        5
      </button>
      <button
        onClick={() => {
          addNumber('6');
        }}>
        6
      </button>
      <br />

      <button
        onClick={() => {
          addNumber('7');
        }}>
        7
      </button>
      <button
        onClick={() => {
          addNumber('8');
        }}>
        8
      </button>
      <button
        onClick={() => {
          addNumber('9');
        }}>
        9
      </button>
      <br />

      <button onClick={() => login(code)}>submit</button>
      <button
        onClick={() => {
          addNumber('0');
        }}>
        0
      </button>
      <button
        onClick={() => {
          setCode('');
        }}>
        Clear
      </button>
    </div>
  );
}
