import React from 'react';

export default function SendButton({ sendBill, clearBill }) {
  return (
    <div
      className="send-button button"
      onClick={() => {
        sendBill().then(clearBill);
      }}>
      <p>Send</p>
    </div>
  );
}
