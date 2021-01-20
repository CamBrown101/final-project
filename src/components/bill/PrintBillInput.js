import React, { useState, useEffect } from 'react';

export default function PrintBillInput({ emails, setEmails, index }) {
  const [email, setEmail] = useState('');
  useEffect(() => {
    const emailsClone = [...emails];
    emailsClone[index] = email;
    setEmails([...emailsClone]);
  }, [email]);

  return (
    <input
      type="email"
      value={email}
      placeholder={
        index ? `Seat ${index} Email Address` : 'Total Bill For Table'
      }
      className={'edit-input'}
      onChange={(event) => {
        setEmail(event.target.value);
      }}></input>
  );
}
