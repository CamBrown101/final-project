import React, { useEffect, useState } from "react";
import "./BillContainer.scss";
import BillHeader from "./BillHeader";
import BillItem from "./BillItem";
import {
  sendBill,
  // formatBillToPrint,
  printBill,
  clearBill,
  payBill,
  getBillData,
  getUnpaidItems,
  getItemsToRender,
} from "./BillHelpers";
import PayButton from "./PayButton";
import SendButton from "./SendButton";
import CancelButton from "./CancelButton";
import EditButton from "./EditButton";
import PrintBillButton from "./PrintBillButton";
import BillTotals from "./BillTotals";

export default function BillContainer({
  bill,
  setBill,
  setTable,
  tableInfo,
  menu,
  seat,
}) {
  const [selected, setSelected] = useState(null);
  const data = getBillData(tableInfo.orderId, bill.items);
  const unpaidItems = getUnpaidItems(tableInfo.items);
  //Changes Item Id's into Item objects

  const itemsToRender = getItemsToRender(bill.items, unpaidItems, menu);
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

  const [mod, setMod] = useState("");
  const [email, setEmail] = useState("");
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
            setBill={setBill}
            setTable={setTable}
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
            data={data}
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
            data={data}
          />
        </div>
      </div>
    </article>
  );
}
