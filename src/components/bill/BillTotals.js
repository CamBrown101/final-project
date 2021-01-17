import React from 'react';

export default function BillTotals({ bill }) {
  return (
    <div className="bill-totals">
      <p>Subtotal: ${bill.subtotal.toFixed(2)}</p>
      <p>Tax: ${bill.tax.toFixed(2)}</p>
      <p>Total: ${bill.total.toFixed(2)}</p>
    </div>
  );
}
