import React from 'react';
import MenuItem from './MenuItem';
import './MenuContainer.scss';

export default function MenuContainer({ setBill, bill, menu }) {
  const menuItems = menu.map((item) => (
    <MenuItem
      key={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
      category_id={item.category_id}
      setBill={setBill}
      bill={bill}
    />
  ));

  return <div className="item-container">{menuItems}</div>;
}
