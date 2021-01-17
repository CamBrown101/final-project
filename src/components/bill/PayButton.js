import React from 'react';
import './BillContainer.scss';

export default function PayButton({ clearBill, sendBill, bill, payBill }) {
  return (
    <div
      className="pay-button button"
      onClick={() => {
        if (bill.items.length !== 0) {
          sendBill().then(() => {
            payBill().then(clearBill);
          });
        } else {
          payBill().then(clearBill);
        }
      }}>
      Pay
    </div>
  );
}
