import React from "react";
import PayPopUp from "./PayPopUp";

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
    <div className="pay-by-seat-button" onClick={() => {}}>
      <p className="pay-button-text">
        {seat ? `Pay for seat ${seat}` : "Pay total bill for table"}
      </p>
      <PayPopUp />
    </div>
  );
}
