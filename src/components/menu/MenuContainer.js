import React from "react";
import MenuItem from "./MenuItem";
import "./MenuContainer.scss";

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
  return <div className="item-container">{menuItems}</div>;
}
