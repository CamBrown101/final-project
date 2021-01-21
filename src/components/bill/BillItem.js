import React from 'react';
import './BillItem.scss';
import Axios from 'axios';
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
}) {
  const deleteItem = () => {
    const orderItemId = unpaidItems[id].order_item_id;
    Axios.post(`api/orders/${orderItemId}/delete`);
    setBillItem(!billItem);
  };

  const modBoolean = mods === 'null';
  return (
    <li
      className={selected === id ? 'bill-item selected' : 'bill-item'}
      onClick={() => {
        if (selected === id) {
          setSelected(null);
        } else {
          setSelected(id);
        }
      }}>
      <div className="item">
        {isAdmin ? (
          <button
            onClick={() => {
              {
                deleteItem();
              }
            }}>
            X
          </button>
        ) : (
          <></>
        )}
        <p>{seat}</p>
        <p className="item-name">{name}</p>
        <p className="item-price">${price.toFixed(2)}</p>
      </div>
      {!modBoolean ? <p className="mod">{mods}</p> : <></>}
    </li>
  );
}
