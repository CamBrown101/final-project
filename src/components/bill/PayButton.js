import React, { useState } from 'react';
import './BillContainer.scss';
import PayBySeatButton from './PayBySeatButton';

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

  const buttonsToRender = [];
  for (let i = 0; i <= tableInfo.seats; i++) {
    buttonsToRender.push(
      <PayBySeatButton
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
      <div className={payToggle + ' pay-dropdown'}>{buttonsToRender}</div>
    </div>
  );
}
