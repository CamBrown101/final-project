import React from 'react';

export default function SendButton({
  sendBill,
  clearBill,
  tableInfo,
  data,
  setTable,
  setBill,
}) {
  return (
    <div
      className="send-button button"
      onClick={() => {
        sendBill(tableInfo, data).then(() => clearBill(setBill, setTable));
      }}>
      <p>Send</p>
    </div>
  );
}
