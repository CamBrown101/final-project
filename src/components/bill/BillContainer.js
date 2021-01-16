import React from 'react';
import Axios from 'axios';
import './BillContainer.scss';
import BillHeader from './BillHeader';
import BillItem from './BillItem';

export default function BillContainer({
  bill,
  setBill,
  setTable,
  tableInfo,
  menu,
}) {
  const data = { itemId: [], seatId: 1, orderId: tableInfo.orderId };
  bill.items.forEach((item) => {
    data.itemId.push(item.id);
  });

  const sendBill = () => {
    return Axios.post(
      `api/orders/${tableInfo.id}/items`,
      data
    ).then((res) => {});
  };
  const clearBill = () => {
    setBill({
      items: [],
      tax: 0,
      subtotal: 0,
      total: 0,
    });
    setTable([]);
  };
  console.log(tableInfo);
  const payBill = () => {
    Axios.post(`/api/orders/${tableInfo.orderId}/pay`, {
      paymentType: 'credit',
    });
    const orderIds = [];
    unpaidItems = [...unpaidItems, ...bill.items];
    unpaidItems.forEach((element) => {
      orderIds.push(element.order_item_id);
    });
    return Axios.post('api/orders/pay', orderIds);
  };
  // pay bill clear table of information - reset table
  // mark order as payed or add an order type
  // mark all items on order_items as payed
  // clear the bill

  let unpaidItems = [];
  let itemsOnBill = { ...tableInfo.items };
  itemsOnBill = itemsOnBill[0];
  if (itemsOnBill) {
    itemsOnBill.forEach((element) => {
      if (!element.is_payed) {
        unpaidItems.push(element);
      }
    });
  }

  let itemsToRender = [...bill.items.reverse()];
  if (unpaidItems) {
    for (let item of unpaidItems) {
      menu.forEach((element) => {
        if (element.id === item.item) {
          itemsToRender.push(element);
        }
      });
    }
  }

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
              sendBill().then(clearBill);
            }}>
            <p>Send</p>
          </div>
          <button className="cancel-button" onClick={() => clearBill()}>
            Cancel
          </button>
          <button
            className="pay-button"
            onClick={() => {
              console.log(bill.items.length === 0);
              if (bill.items.length !== 0) {
                sendBill().then(() => {
                  payBill().then(clearBill);
                });
              } else {
                payBill().then(clearBill);
              }
            }}>
            Pay
          </button>
        </div>
      </div>
    </article>
  );
}
