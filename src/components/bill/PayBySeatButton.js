import React from "react";

export default function PayBySeatButton({
  payBill,
  sendBill,
  clearBill,
  seat,
  items,
  orderId,
  data,
  tableInfo,
  setBill,
  setTable,
  bill,
  cost,
}) {
  return (
    <div
      className="pay-by-seat-button"
      onClick={() => {
        if (bill.items.length !== 0) {
          sendBill(tableInfo, data).then((res) => {
            console.log(res.data);
            payBill(orderId, [
              ...items,
              ...res.data.filter((item) => {
                return item.seat_number === seat;
              }),
            ]).then(() => clearBill(setBill, setTable));
          });
        } else {
          payBill(orderId, items).then(() => clearBill(setBill, setTable));
        }
      }}
    >
      <p className="pay-button-text">
        {seat ? `Pay for seat ${seat}` : "Pay total bill for table"}
      </p>
    </div>
  );
}
