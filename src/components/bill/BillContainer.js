import React from 'react';
import './BillContainer.scss';
import BillHeader from './BillHeader';
import BillItem from './BillItem';

export default function BillContainer({ bill }) {
  const tax = 0;
  const total = 0;
  console.log(bill);
  const billItems = bill.map((item, index) => (
    <BillItem key={index} name={item.name} price={item.price} />
  ));
  return (
    <article className="bill-container">
      <BillHeader />
      <ul className="bill-items">{billItems}</ul>
      <div className="bill-footer">
        <div className="bill-totals">
          <p>Tax:{tax}</p>
          <p>Total:{total}</p>
        </div>
      </div>
    </article>
  );
}
