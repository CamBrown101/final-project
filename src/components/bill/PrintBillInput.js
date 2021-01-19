import React from 'react';

export default function PrintBillInput({ email, setEmail, index }) {
  return (
    <input
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
