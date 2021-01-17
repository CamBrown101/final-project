import React from 'react';

export default function SendButton({ sendBill, clearBill, tableInfo, data }) {
  return (
    <div
      className="send-button button"
      onClick={() => {
        sendBill(tableInfo, data).then(clearBill);
      }}>
      <p>Send</p>
    </div>
  );
}
