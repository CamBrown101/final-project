import React, { useState } from 'react';

export default function PrintBillButton({
  email,
  setEmail,
  printBill,
  itemsToRender,
  tableInfo,
  bill,
}) {
  const [printToggle, setPrintToggle] = useState('hide');

  return (
    <div className="print-section">
      <div
        className="print-button button"
        onClick={() => {
          printToggle === 'hide'
            ? setPrintToggle('show')
            : setPrintToggle('hide');
        }}>
        Print
      </div>
      <input
        value={email}
        className={printToggle + ' edit-input'}
        onChange={(event) => {
          setEmail(event.target.value);
        }}></input>
      <div className="confirm-cancel-buttons">
        <div
          className={printToggle + ' button send-button'}
          onClick={() => {
            printBill(email, itemsToRender, tableInfo, bill);
            setEmail('');
            setPrintToggle('hide');
          }}>
          Confrim
        </div>
        <div
          className={printToggle + ' button cancel-button'}
          onClick={() => {
            setEmail('');
            setPrintToggle('hide');
          }}>
          Cancel
        </div>
      </div>
    </div>
  );
}
