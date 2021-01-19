import React, { useState } from 'react';
import MenuItem from './MenuItem';
import './MenuContainer.scss';
import SearchBar from './SearchBar';

export default function MenuContainer({ setBill, bill, menu, seat, category }) {
  const menuItems = menu
    .filter((item) => item.category_id === category || category === 0)
    .map((item) => (
      <MenuItem
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        description={item.description}
        category_id={item.category_id}
        setBill={setBill}
        bill={bill}
        seat={seat}
      />
    ));
  const [menuSearch, setMenuSearch] = useState('');
  return (
    <div className="menu-item-container">
      <div>
        <SearchBar menuSearch={menuSearch} setMenuSearch={setMenuSearch} />
        <div className="item-container">{menuItems}</div>
      </div>
      <div className="category-selectors">
        <div className="category-tab">
          <p className="category-selector">category 1</p>
        </div>
        <div className="category-tab">
          <p className="category-selector">category 1</p>
        </div>
        <div className="category-tab">
          <p className="category-selector">category 1</p>
        </div>
        <div className="category-tab">
          <p className="category-selector">category 1</p>
        </div>
        <div className="category-tab">
          <p className="category-selector">category 1</p>
        </div>
      </div>
    </div>
  );
}
