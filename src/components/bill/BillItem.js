import React from 'react';
import './BillItem.scss';

export default function BillItem({ name, price }) {
  return (
    <li className="bill-item">
      <p className="item-name">{name}</p>
      <p className="item-price">${price.toFixed(2)}</p>
    </li>
  );
}
