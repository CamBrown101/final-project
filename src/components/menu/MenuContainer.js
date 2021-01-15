import React from 'react';
import MenuItem from './MenuItem';
import './MenuContainer.scss';

export default function MenuContainer(props) {
  const menuItems = props.menu.map((item) => (
    <MenuItem
      key={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
      category_id={item.category_id}
    />
  ));

  return <div className="item-container">{menuItems}</div>;
}
