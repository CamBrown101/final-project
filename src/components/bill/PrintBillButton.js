import React, { useState, useEffect } from "react";

export default function PrintBillButton({
  email,
  setEmail,
  printBill,
  itemsToRender,
  tableInfo,
  bill,
  data,
}) {
  const [printToggle, setPrintToggle] = useState("hide");
  let cssClass = "print-button button";
  if (!itemsToRender.length) {
    cssClass += " opacity";
  }
  return (
    <div className="print-section">
      <div
        className={cssClass}
        onClick={() => {
          if (!itemsToRender.length) {
            setPrintToggle("hide");
          } else {
            printToggle === "hide"
              ? setPrintToggle("show")
              : setPrintToggle("hide");
          }
        }}
      >
        Print
      </div>
      <div className={printToggle + " print-dropdown"}>
        <input
          value={email}
          className={"edit-input"}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        ></input>
        <div className="confirm-cancel-buttons">
          <div
            className={"button send-button"}
            onClick={() => {
              printBill(email, itemsToRender, tableInfo, bill);
              setEmail("");
              setPrintToggle("hide");
            }}
          >
            Confrim
          </div>
          <div
            className={"button cancel-button"}
            onClick={() => {
              setEmail("");
              setPrintToggle("hide");
            }}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
