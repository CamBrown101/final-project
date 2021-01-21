import React, { useState } from "react";
import "./BillItem.scss";
import Axios from "axios";
export default function BillItem({
  name,
  price,
  id,
  setSelected,
  selected,
  mods,
  seat,
  isAdmin,
  unpaidItems,
  billItem,
  setBillItem,
  bill,
}) {
  const deleteItem = () => {
    const orderItemId = unpaidItems[id].order_item_id;
    Axios.post(`api/orders/${orderItemId}/delete`);
    setBillItem(!billItem);
  };
  let renderButton = false;
  if (isAdmin && id + 1 > bill.items.length) {
    renderButton = true;
  }
  const [deleted, setDeleted] = useState(false);
  const modBoolean = mods === "null";
  return (
    <li
      className={selected === id ? "bill-item selected" : "bill-item"}
      onClick={() => {
        if (selected === id) {
          setSelected(null);
        } else {
          setSelected(id);
        }
      }}
    >
      <div className="item">
        {renderButton ? (
          <button
            onClick={() => {
              {
                deleteItem();
                setDeleted(true);
              }
            }}
          >
            X
          </button>
        ) : (
          <></>
        )}
        <p className={deleted ? "deleted" : ""}>{seat}</p>
        <p className={deleted ? "deleted item-name" : "item-name"}>{name}</p>
        <p className={deleted ? "deleted item-price" : "item-price"}>
          ${price.toFixed(2)}
        </p>
      </div>
      {!modBoolean ? <p className="mod">{mods}</p> : <></>}
    </li>
  );
}
