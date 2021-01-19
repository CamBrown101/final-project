import React from "react";
import "./ProductionOrderItem.scss";

export default function ProductionOrderItem({
  name,
  mods,
  id,
  selectedItems,
  setSelectedItems,
}) {
  const modBoolean = mods === "null";
  let cssClass = "";
  if (selectedItems.find((ele) => ele === id) !== undefined) {
    cssClass = "item-selected";
  }
  return (
    <li
      className={cssClass}
      onClick={(event) => {
        event.stopPropagation();
        if (selectedItems.find((ele) => ele === id) !== undefined) {
          cssClass = "";
          const rem = selectedItems.findIndex((ele) => ele === id);
          const newArr = [...selectedItems];
          newArr.splice(rem, 1);
          setSelectedItems(newArr);
        } else setSelectedItems([...selectedItems, id]);
      }}
    >
      <div className="prod-item">
        <p className="prod-item-name">{name}</p>
      </div>
      {!modBoolean ? <p className="mod">{mods}</p> : <></>}
    </li>
  );
}
