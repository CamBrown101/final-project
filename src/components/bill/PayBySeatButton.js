import React, { useState } from 'react';
import PayPopUp from './PayPopUp';

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
  const [hidden, setHidden] = useState(true);
  return (
    <div
      className="pay-by-seat-button"
      onClick={() => {
        setHidden(false);
      }}>
      <p className="pay-button-text">
        {seat ? `Pay for seat ${seat}` : 'Pay total bill for table'}
      </p>
      {hidden ? (
        <></>
      ) : (
        <PayPopUp
          cost={cost}
          bill={bill}
          tableInfo={tableInfo}
          data={data}
          orderId={tableInfo.orderId}
          items={items}
          seat={seat}
          setBill={setBill}
          setTable={setTable}
          hidden={hidden}
          setHidden={setHidden}
        />
      )}
    </div>
  );
}
