import React from 'react';
import Axios from 'axios';
import './BillContainer.scss';
import BillHeader from './BillHeader';
import BillItem from './BillItem';

export default function BillContainer({ bill, tableInfo, menu }) {
  let itemsOnBill = { ...tableInfo.items };
  itemsOnBill = itemsOnBill[0];

  const itemsToRender = [...bill.items.reverse()];

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

  const data = {};
  const sendBill = () => {
    Axios.post('', data);
  };
  console.log(itemsToRender);
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
          <div className="send-button">
            <p>Send</p>
          </div>
          <div className="cancel-button">
            <p>Cancel</p>
          </div>
        </div>
      </div>
    </article>
  );
}
