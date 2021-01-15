import React, { useState, useEffect } from 'react';
import './BillContainer.scss';
import BillHeader from './BillHeader';
import BillItem from './BillItem';

export default function BillContainer({ bill }) {
  const [totals, setTotals] = useState({
    totalTax: 0,
    finalTotal: 0,
    totalPreTax: 0,
    tax: 0.15,
  });
  useEffect(() => {
    let newTotal = 0;
    for (let item of bill) {
      newTotal += item.price;
    }

    setTotals({
      ...totals,
      totalPreTax: newTotal,
      finalTotal: newTotal + newTotal * totals.tax,
    });
  }, [bill]);

  const billItems = bill.map((item, index) => (
    <BillItem key={index} name={item.name} price={item.price} />
  ));
  return (
    <article className="bill-container">
      <BillHeader />
      <ul className="bill-items">{billItems}</ul>
      <div className="bill-footer">
        <div className="bill-totals">
          <p>Total before tax: ${totals.totalPreTax.toFixed(2)}</p>
          <p>Tax: ${(totals.tax * totals.totalPreTax).toFixed(2)}</p>
          <p>Total: ${totals.finalTotal.toFixed(2)}</p>
        </div>
      </div>
    </article>
  );
}
