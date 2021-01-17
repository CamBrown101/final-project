import React, { useState } from 'react';
import './BillItem.scss';

export default function BillItem({ name, price }) {
  const [selected, setSelected] = useState(false);
  const mod = false;
  return (
    <li
      className={`bill-item ${selected ? 'selected' : ''}`}
      onClick={selected ? () => setSelected(false) : () => setSelected(true)}>
      <div className="item">
        <p className="item-name">{name}</p>
        <p className="item-price">${price.toFixed(2)}</p>
      </div>
      {mod ? <p className="mod">MOD</p> : <></>}
    </li>
  );
}
