import React from 'react';
import './ProductionOrderItem.scss';

export default function ProductionOrderItem({
  name,
  mods,
  id,
  selectedItems,
  setSelectedItems,
}) {
  const modBoolean = mods === 'null';
  console.log(selectedItems);
  let cssClass = '';
  if (selectedItems.find((ele) => ele === id)) {
    cssClass = 'item-selected';
  }
  return (
    <li
      className={cssClass}
      onClick={(event) => {
        event.stopPropagation();
        setSelectedItems([...selectedItems, id]);
        if (selectedItems.find((ele) => ele === id)) {
          cssClass = '';
          setSelectedItems(
            [...selectedItems].splice(
              [...selectedItems].find((ele) => ele === id),
              1
            )
          );
        }
      }}>
      <div className="prod-item">
        <p className="prod-item-name">{name}</p>
      </div>
      {!modBoolean ? <p className="mod">{mods}</p> : <></>}
    </li>
  );
}
