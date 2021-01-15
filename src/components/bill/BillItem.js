import React from 'react';
import './BillItem.scss';

export default function BillItem() {
  return (
    <li className="bill-item">
      <p className="item-name">item.name</p>
      <p className="item-price">item.price</p>
    </li>
  );
}
