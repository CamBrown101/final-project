import React from 'react';
import './PayPopUp.scss';

export default function PayPopUp({
  cost,
  bill,
  tableInfo,
  data,
  orderId,
  items,
  seat,
  setBill,
  setTable,
  hidden,
  setHidden,
}) {
  return (
    <div className={`modal ${hidden ? 'hidden' : ''}`}>
      <div className="modal_content">
        <button onClick={() => setHidden(true)} className="close">
          X
        </button>
        <p>I'm A Pop Up!!!</p>
      </div>
    </div>
  );
}
