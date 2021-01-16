import React from 'react';
import './MenuItem.scss';

export default function MenuItem({ name, price, id, setBill, bill }) {
  let newTotal = bill.total;
  let newSubtotal = bill.subtotal;
  let newTax = bill.tax;
  const changePrice = () => {
    newSubtotal += price;
    newTax = newSubtotal * 0.13;
    newTotal = newSubtotal + newTax;
  };
  return (
    <div
      className="menu-item"
      onClick={() => {
        changePrice();
        setBill({
          items: [...bill.items, { name, price, id }],
          total: newTotal,
          subtotal: newSubtotal,
          tax: newTax,
        });
      }}>
      <h3>{name}</h3>
      <h3>${price}</h3>
      <br />
    </div>
  );
}
