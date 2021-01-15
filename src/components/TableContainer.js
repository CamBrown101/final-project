import React from "react";
import TableItem from "./TableItem";
import "./MenuContainer.scss";

export default function MenuContainer(props) {
  const menuItems = props.tables.map((item) => (
    <TableItem
      key={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
      category_id={item.category_id}
    />
  ));

  return <div className="item-container">{menuItems}</div>;
}
