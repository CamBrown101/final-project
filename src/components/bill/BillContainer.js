import React from 'react';
import './BillContainer.scss';
import BillHeader from './BillHeader';
import BillItem from './BillItem';

export default function BillContainer() {
  const tax = 0;
  const total = 0;

  return (
    <article className="bill-container">
      <BillHeader />
      <ul className="bill-items">
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
        <BillItem />
      </ul>
      <div className="bill-footer">
        <div className="bill-totals">
          <p>Tax:{tax}</p>
          <p>Total:{total}</p>
        </div>
      </div>
    </article>
  );
}
