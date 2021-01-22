import React, { useState, useEffect } from "react";
import "./BillContainer.scss";
import PayBySeatButton from "./PayBySeatButton";
import { totalBillsBySeat } from "./BillHelpers";
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
  itemsToRender,
}) {
  let cssClass = "pay-button button";
  if (!data.orderId) {
    cssClass += " opacity";
  }
  const [payToggle, setPayToggle] = useState("hide");
  const billsBySeat = totalBillsBySeat(itemsToRender, bill, tableInfo);
  const buttonsToRender = [];
  useEffect(() => {
    setPayToggle("hide");
  }, [tableInfo]);
  for (let i = 0; i <= tableInfo.seats; i++) {
    if (billsBySeat[i].total !== 0) {
      buttonsToRender.push(
        <PayBySeatButton
          payBill={payBill}
          sendBill={sendBill}
          clearBill={clearBill}
          seat={i}
          key={i}
          items={billsBySeat[i].items}
          cost={billsBySeat[i].total}
          orderId={i !== 0 ? null : tableInfo.orderId}
          data={data}
          tableInfo={tableInfo}
          setBill={setBill}
          setTable={setTable}
          bill={bill}
        />
      );
    }
  }

  return (
    <div className="pay-section">
      <div
        className={cssClass}
        onClick={() => {
          payToggle === "hide" ? setPayToggle("show") : setPayToggle("hide");
        }}
      >
        Pay
      </div>
      <div className={payToggle + " pay-dropdown"}>{buttonsToRender}</div>
    </div>
  );
}
