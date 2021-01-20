import React from 'react';

export default function PayBySeatButton({
  seat,
  payBill,
  sendBill,
  clearBill,
}) {
  return (
    <div>
      <div>{seat ? `Pay for seat ${seat}` : 'Pay total bill for table'}</div>
    </div>
  );
}

// if (data.orderId) {
//   if (bill.items.length !== 0) {
//     sendBill(tableInfo, data).then(() => {
//       payBill(tableInfo.orderId, unpaidItems, bill.items).then(() =>
//         clearBill(setBill, setTable)
//       );
//     });
//   } else {
//     payBill(tableInfo.orderId, unpaidItems, bill.items).then(() =>
//       clearBill(setBill, setTable)
//     );
//   }
// }
