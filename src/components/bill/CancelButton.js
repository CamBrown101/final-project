import React from 'react';

export default function CancelButton({ clearBill }) {
  return (
    <div
      className="cancel-button button"
      onClick={() => {
        clearBill();
      }}>
      Cancel
    </div>
  );
}
