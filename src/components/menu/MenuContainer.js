import React, { useState } from 'react';
import MenuItem from './MenuItem';
import './MenuContainer.scss';
import SearchBar from './SearchBar';
import CategoryItem from './CategoryItem';

export default function MenuContainer({
  setBill,
  bill,
  menu,
  seat,
  category,
  setCategory,
  categories,
}) {
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

  const categoryItems = categories.map((cat) => (
    <CategoryItem
      key={cat.id}
      id={cat.id}
      name={cat.name}
      setCategory={setCategory}
    />
  ));
  categoryItems.unshift(
    <CategoryItem key={0} id={0} name={'All'} setCategory={setCategory} />
  );
  const [menuSearch, setMenuSearch] = useState('');
  return (
    <div className="menu-item-container">
      <div>
        <SearchBar menuSearch={menuSearch} setMenuSearch={setMenuSearch} />
        <div className="item-container">{menuItems}</div>
      </div>
      <div className="category-selectors">{categoryItems}</div>
    </div>
  );
}
