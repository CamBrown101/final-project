import React from "react";
import "./CategoryItem.scss";

export default function CategoryItem({ name, id, setCategory }) {
  return (
    <div className="category-tab" onClick={() => setCategory(id)}>
      <p className="category-selector">{name}</p>
    </div>
  );
}
