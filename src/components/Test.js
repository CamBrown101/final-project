import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function Test() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>TEST</h1>
    </div>
  );
}
