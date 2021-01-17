import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './BillContainer.scss';
import BillHeader from './BillHeader';
import BillItem from './BillItem';
import {
  sendBill,
  formatBillToPrint,
  printBill,
  clearBill,
  payBill,
  getBillData,
} from './BillHelpers';
import PayButton from './PayButton';
import SendButton from './SendButton';
import CancelButton from './CancelButton';
import EditButton from './EditButton';
import PrintBillButton from './PrintBillButton';
import BillTotals from './BillTotals';

export default function BillContainer({
  bill,
  setBill,
  setTable,
  tableInfo,
  menu,
  seat,
}) {
  const [selected, setSelected] = useState(null);
  // const getBillData = () => {
  //   const data = {
  //     itemId: [],
  //     seatId: [],
  //     orderId: tableInfo.orderId,
  //     mods: [],
  //   };
  //   bill.items.forEach((item) => {
  //     data.itemId.push(item.id);
  //     data.mods.push(item.mods ? item.mods : null);
  //     data.seatId.push(item.seat);
  //   });
  // };
  const data = getBillData(tableInfo.orderId, bill.items);
  // const clearBill = () => {
  //   setBill({
  //     items: [],
  //     tax: 0,
  //     subtotal: 0,
  //     total: 0,
  //   });
  //   setTable([]);
  // };

  // const payBill = () => {
  //   Axios.post(`/api/orders/${tableInfo.orderId}/pay`, {
  //     paymentType: "credit",
  //   });
  //   const orderIds = [];
  //   unpaidItems = [...unpaidItems, ...bill.items];
  //   unpaidItems.forEach((element) => {
  //     orderIds.push(element.order_item_id);
  //   });
  //   return Axios.post("api/orders/pay", orderIds);
  // };

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

  //Changes Item Id's into Item objects
  const billCopy = [...bill.items];
  let itemsToRender = [...billCopy.reverse()];
  if (unpaidItems) {
    for (let item of unpaidItems) {
      menu.forEach((element) => {
        if (element.id === item.item) {
          const elementCopy = { ...element };
          elementCopy.mods = item.mods;
          elementCopy.seat = item.seat_number;
          itemsToRender.push(elementCopy);
        }
      });
    }
  }

  useEffect(() => {
    let newTotal = 0;
    let newSubtotal = 0;
    let newTax = 0;
    itemsToRender.forEach((item) => {
      newSubtotal += item.price;
      newTax = newSubtotal * 0.13;
      newTotal = newSubtotal + newTax;
    });
    setBill({
      items: [...bill.items],
      total: newTotal,
      subtotal: newSubtotal,
      tax: newTax,
    });
  }, [tableInfo]);

  const billItems = itemsToRender.map((item, index) => (
    <BillItem
      key={index}
      id={index}
      name={item.name}
      price={item.price}
      selected={selected}
      setSelected={setSelected}
      mods={item.mods}
      seat={item.seat}
    />
  ));

  // const formatBillToPrint = (billToPrint) => {
  //   let formattedBill = "";
  //   billToPrint.forEach(
  //     (item) =>
  //       (formattedBill += `<div style="display:flex;"><h3>${item.name}</h3><h3>: ${item.price}</h3></div><br></br>`)
  //   );
  //   formattedBill += `<div style="display:flex;"> <p>Subtotal: ${bill.subtotal.toFixed(
  //     2
  //   )}</p></div><br></br>`;
  //   formattedBill += `<div style="display:flex;"> <p>Tax: ${bill.tax.toFixed(
  //     2
  //   )}</p></div><br></br>`;
  //   formattedBill += `<div style="display:flex;"> <p>Total: ${bill.total.toFixed(
  //     2
  //   )}</p></div><br></br>`;

  //   return formattedBill;
  // };

  // const printBill = () => {
  //   const data = {
  //     email: email,
  //     bill: formatBillToPrint(itemsToRender),
  //   };
  //   Axios.post(`/api/orders/${tableInfo.orderId}/email`, data);
  // };

  const [mod, setMod] = useState('');
  const [email, setEmail] = useState('');
  return (
    <article className="bill-container">
      <BillHeader table={tableInfo} />
      <ul className="bill-items">{billItems}</ul>
      <div className="bill-footer">
        <BillTotals bill={bill} />
        <div className="buttons">
          <SendButton
            sendBill={sendBill}
            clearBill={clearBill}
            tableInfo={tableInfo}
            data={data}
          />
          <CancelButton
            setBill={setBill}
            setTable={setTable}
            clearBill={clearBill}
          />
          <PayButton
            payBill={payBill}
            clearBill={clearBill}
            sendBill={sendBill}
            bill={bill}
            tableInfo={tableInfo}
            data={data}
            unpaidItems={unpaidItems}
            setBill={setBill}
            setTable={setTable}
          />
          <EditButton
            mod={mod}
            setMod={setMod}
            bill={bill}
            selected={selected}
          />
          <PrintBillButton
            email={email}
            setEmail={setEmail}
            printBill={printBill}
            tableInfo={tableInfo}
            itemsToRender={itemsToRender}
            bill={bill}
          />
        </div>
      </div>
    </article>
  );
}
