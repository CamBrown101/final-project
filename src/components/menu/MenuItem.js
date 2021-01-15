import React from 'react';
import './MenuItem.scss';

export default function MenuItem({ name, price, setBill, bill }) {
  return (
    <div
      className="menu-item"
      onClick={() => {
        setBill([...bill, { name, price }]);
      }}>
      <h3>{name}</h3>
      <h3>${price}</h3>
      <br />
    </div>
  );
}
