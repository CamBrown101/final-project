import React, { useState, useEffect } from 'react';
import { totalBillsBySeat } from './BillHelpers';
import PrintBillInput from './PrintBillInput';

export default function PrintBillButton({
  printBill,
  itemsToRender,
  tableInfo,
  bill,
}) {
  const [emails, setEmails] = useState(['']);
  const [printToggle, setPrintToggle] = useState('hide');
  const billsBySeat = totalBillsBySeat(itemsToRender, bill, tableInfo);
  useEffect(() => {
    setPrintToggle('hide');
  }, [tableInfo]);

  let cssClass = 'print-button button';
  if (!itemsToRender.length) {
    cssClass += ' opacity';
  }

  const inputsToRender = [];
  for (let i = 0; i <= tableInfo.seats; i++) {
    inputsToRender.push(
      <PrintBillInput emails={emails} setEmails={setEmails} index={i} key={i} />
    );
  }

  return (
    <div className="print-section">
      <div
        className={cssClass}
        onClick={() => {
          if (!itemsToRender.length) {
            setPrintToggle('hide');
          } else {
            printToggle === 'hide'
              ? setPrintToggle('show')
              : setPrintToggle('hide');
          }
        }}>
        Print
      </div>
      <div className={printToggle + ' print-dropdown'}>
        <div className="inputs-container">{inputsToRender}</div>
        <div className="confirm-cancel-buttons">
          <div
            className={'button send-button'}
            onClick={() => {
              printBill(emails, billsBySeat, tableInfo);
              setEmails([]);
              setPrintToggle('hide');
            }}>
            Confrim
          </div>
          <div
            className={'button cancel-button'}
            onClick={() => {
              setEmails([]);
              setPrintToggle('hide');
            }}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
}
