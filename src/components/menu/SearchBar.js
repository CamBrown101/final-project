import React from 'react';
import './SearchBar.scss';

export default function SearchBar({ menuSearch, setMenuSearch }) {
  return (
    <div className="menu-search-bar">
      <i></i>
      <input
        placeholder="Search Menu Items"
        value={menuSearch}
        className="menu-search-input"
        onChange={(event) => {
          setMenuSearch(event.target.value);
        }}></input>
    </div>
  );
}
