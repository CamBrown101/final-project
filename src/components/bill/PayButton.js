import React, { useState } from 'react';
import './BillContainer.scss';
import PayBillBySeatButton from './PayBillBySeatButton';

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
}) {
  let cssClass = 'pay-button button';
  if (!data.orderId) {
    cssClass += ' opacity';
  }
  const [payToggle, setPayToggle] = useState('hide');

  const inputsToRender = [];
  for (let i = 0; i <= tableInfo.seats; i++) {
    inputsToRender.push(
      <PayBillBySeatButton
        payBill={payBill}
        sendBill={sendBill}
        clearBill={clearBill}
        seat={i}
        key={i}
      />
    );
  }
  return (
    <div className="pay-section">
      <div
        className={cssClass}
        onClick={() => {
          payToggle === 'hide' ? setPayToggle('show') : setPayToggle('hide');
        }}>
        Pay
      </div>
      <div className={payToggle + ' pay-dropdown'}>{inputsToRender}</div>
    </div>
  );
}
