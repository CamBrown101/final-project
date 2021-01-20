import React, { useState } from 'react';
import PrintBillInput from './PrintBillInput';

export default function PrintBillButton({
  printBill,
  itemsToRender,
  tableInfo,
  bill,
}) {
  const [emails, setEmails] = useState(['']);
  const billsBySeat = [
    { subtotal: bill.subtotal, tax: bill.tax, total: bill.total },
  ];
  const totalBillsBySeat = () => {
    //creates empty objects per seat on table
    for (let i = 1; i <= tableInfo.seats; i++) {
      billsBySeat.push({ items: [], subtotal: 0, tax: 0, total: 0 });
    }
    //adds totals to billsBySeat array where index = seatnumber 0 being bill total
    itemsToRender.forEach((element) => {
      let seatNumber = element.seat;
      if (billsBySeat[seatNumber]) {
        billsBySeat[seatNumber].items.push(element);
        billsBySeat[seatNumber].subtotal += element.price;
        billsBySeat[seatNumber].tax += element.price * 0.13;
        billsBySeat[seatNumber].total += element.price * 1.13;
      }
    });

    //This is a test function to compare bill totals equal overall total
    // const checkTotal = () => {
    //   let itemTotal = 0;
    //   for (let i = 1; i < billsBySeat.length; i++) {
    //     itemTotal += billsBySeat[i].total;
    //   }

    //   return itemTotal.toFixed(2) === billsBySeat[0].total.toFixed(2);
    // };
    // console.log(checkTotal());
  };

  totalBillsBySeat();

  const [printToggle, setPrintToggle] = useState('hide');
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
              printBill(emails, itemsToRender, tableInfo, billsBySeat);
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
