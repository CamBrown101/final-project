import React from 'react';

export default function CancelButton({ clearBill, setBill, setTable }) {
  return (
    <div
      className="cancel-button button"
      onClick={() => {
        clearBill(setBill, setTable);
      }}>
      Cancel
    </div>
  );
}
