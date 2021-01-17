import React, { useEffect, useState } from "react";
import "./BillItem.scss";

export default function BillItem({ name, price, id, setSelected, selected }) {
  let billClass = "";
  useEffect(() => {
    billClass = `bill-item ${selected === id ? "selected" : ""}`;
  }, [selected]);
  return (
    <li className={billClass} onClick={(id) => setSelected(id)}>
      <div className="item">
        <p className="item-name">{name}</p>
        <p className="item-price">${price.toFixed(2)}</p>
      </div>
      {mod ? <p className="mod">MOD</p> : <></>}
    </li>
  );
}
