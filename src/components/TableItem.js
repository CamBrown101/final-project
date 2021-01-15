import React from "react";
import "./TableItem.scss";

export default function TableItem(props) {
  return (
    <div className="table-item">
      <h3>{props.name}</h3>
      <h3>${props.price}</h3>
      <br />
    </div>
  );
}
