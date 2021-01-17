import React, { useState } from 'react';
import './BillItem.scss';

export default function BillItem({ name, price }) {
  const [selected, setSelected] = useState(false);
  return (
    <li
      className={`bill-item ${selected ? 'selected' : ''}`}
      onClick={selected ? () => setSelected(false) : () => setSelected(true)}>
      <p className="item-name">{name}</p>
      <p className="item-price">${price.toFixed(2)}</p>
    </li>
  );
}
