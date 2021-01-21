import React, { useState, useEffect } from 'react';

export default function PrintBillInput({ emails, setEmails, index }) {
  const [email, setEmail] = useState(emails[index]);
  useEffect(() => {
    setEmails((emails) => {
      const emailsClone = [...emails];
      emailsClone[index] = email;
      return emailsClone;
    });
  }, [email]);

  useEffect(() => {
    if (email !== emails[index]) {
      setEmail(emails[index]);
    }
  }, [emails, index]);

  return (
    <input
      type="email"
      value={email || ''}
      placeholder={
        index ? `Seat ${index} Email Address` : 'Total Bill For Table'
      }
      className={'edit-input'}
      onChange={(event) => {
        setEmail(event.target.value);
      }}></input>
  );
}
