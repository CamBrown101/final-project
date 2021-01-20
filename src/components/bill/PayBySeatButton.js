import React from 'react';

export default function PayBySeatButton({
  seat,
  payBill,
  sendBill,
  clearBill,
  bill,
  tableInfo,
  setBill,
  setTable,
  unpaidItems,
  data,
}) {
  return (
    <div
      className="pay-by-seat-button"
      onClick={() => {
        if (data.orderId) {
          if (bill.items.length !== 0) {
            sendBill(tableInfo, data).then(() => {
              payBill(
                tableInfo.orderId,
                unpaidItems,
                bill.items,
                seat
              ).then(() => clearBill(setBill, setTable));
            });
          } else {
            payBill(tableInfo.orderId, unpaidItems, bill.items, seat).then(() =>
              clearBill(setBill, setTable)
            );
          }
        }
      }}>
      <p className="pay-button-text">
        {seat ? `Pay for seat ${seat}` : 'Pay total bill for table'}
      </p>
    </div>
  );
}
