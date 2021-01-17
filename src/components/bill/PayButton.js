import React from 'react';
import './BillContainer.scss';

export default function PayButton({
  clearBill,
  sendBill,
  bill,
  payBill,
  tableInfo,
  data,
  unpaidItems,
  setBill,
  setTable,
}) {
  return (
    <div
      className="pay-button button"
      onClick={() => {
        if (bill.items.length !== 0) {
          sendBill(tableInfo, data).then(() => {
            payBill(tableInfo.orderId, unpaidItems, bill.items).then(() =>
              clearBill(setBill, setTable)
            );
          });
        } else {
          payBill(tableInfo.orderId, unpaidItems, bill.items).then(() =>
            clearBill(setBill, setTable)
          );
        }
      }}>
      Pay
    </div>
  );
}
