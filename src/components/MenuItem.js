import React from 'react';
import './MenuItem.scss';

export default function MenuItem(props) {
  return (
    <div className="menu-item">
      <h3>{props.name}</h3>
      <h3>${props.price}</h3>
      <br />
    </div>
  );
}
