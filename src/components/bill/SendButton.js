import React from 'react';

export default function SendButton({
  sendBill,
  clearBill,
  tableInfo,
  data,
  setTable,
  setBill,
}) {
  let cssClass = 'send-button button';
  if (!data.itemId.length || !data.orderId) {
    cssClass += ' opacity';
  }
  return (
    <div
      className={cssClass}
      onClick={() => {
        if (data.itemId.length) {
          sendBill(tableInfo, data).then(() => clearBill(setBill, setTable));
        }
      }}>
      <p>Send</p>
    </div>
  );
}
