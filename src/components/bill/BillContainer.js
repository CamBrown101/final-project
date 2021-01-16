import React from 'react';
import Axios from 'axios';
import './BillContainer.scss';
import BillHeader from './BillHeader';
import BillItem from './BillItem';

export default function BillContainer({ bill, setBill, tableInfo, menu }) {
  let itemsOnBill = { ...tableInfo.items };
  itemsOnBill = itemsOnBill[0];

  let itemsToRender = [...bill.items.reverse()];

  if (itemsOnBill) {
    for (let item of itemsOnBill) {
      menu.forEach((element) => {
        if (element.id === item.item) {
          itemsToRender.push(element);
        }
      });
    }
  }

  // INSERT INTO order_items(order_id, seat_id, item)
  // INSERT INTO orders(employee_id, table_id)
  console.log(tableInfo);
  const data = [];
  // each object orderID itemID = bill.menuItemid and seatID = 1
  console.log(data);
  const sendBill = () => {
    Axios.post(`api/orders/${tableInfo.id}/items`, data);
  };
  const cancelBill = () => {
    // setBill([]);
  };
  const billItems = itemsToRender.map((item, index) => (
    <BillItem key={index} name={item.name} price={item.price} />
  ));

  return (
    <article className="bill-container">
      <BillHeader table={tableInfo} />
      <ul className="bill-items">{billItems}</ul>
      <div className="bill-footer">
        <div className="bill-totals">
          <p>Subtotal: ${bill.subtotal.toFixed(2)}</p>
          <p>Tax: ${bill.tax.toFixed(2)}</p>
          <p>Total: ${bill.total.toFixed(2)}</p>
        </div>
        <div className="buttons">
          <div
            className="send-button"
            onClick={() => {
              sendBill();
            }}>
            <p>Send</p>
          </div>
          <button className="cancel-button" onClick={() => cancelBill()}>
            Cancel
          </button>
        </div>
      </div>
    </article>
  );
}
