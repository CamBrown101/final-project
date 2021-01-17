import React, { useEffect, useState } from 'react';
import './BillItem.scss';
export default function BillItem({
  name,
  price,
  id,
  setSelected,
  selected,
  mods,
}) {
  const mod = mods === 'null';
  return (
    <li
      className={selected === id ? 'bill-item selected' : 'bill-item'}
      onClick={() => setSelected(id)}>
      <div className="item">
        <p className="item-name">{name}</p>
        <p className="item-price">${price.toFixed(2)}</p>
      </div>
      {!mod ? <p className="mod">{mods}</p> : <></>}
    </li>
  );
}
