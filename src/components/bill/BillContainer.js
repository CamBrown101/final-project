import React, { useEffect, useState, useContext } from 'react';
import './BillContainer.scss';
import BillHeader from './BillHeader';
import BillItem from './BillItem';
import {
  sendBill,
  printBill,
  clearBill,
  payBill,
  getBillData,
  getUnpaidItems,
  getItemsToRender,
  updateBill,
} from './BillHelpers';
import PayButton from './PayButton';
import SendButton from './SendButton';
import CancelButton from './CancelButton';
import EditButton from './EditButton';
import PrintBillButton from './PrintBillButton';
import BillTotals from './BillTotals';
import { UserContext } from '../../UserContext';
import DragAndDrop from './DragAndDrop';
import EditSeatButton from './EditSeatButton';

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
  const itemsToRender = getItemsToRender(bill.items, unpaidItems, menu);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setSelected(null);
  }, [tableInfo]);

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
    // eslint-disable-next-line
  }, [tableInfo, seat]);

  useEffect(() => {
    if (itemsToRender[selected]) {
      const upData = { seat: seat, item: itemsToRender[selected].orderItemId };
      updateBill(tableInfo, upData);

      // if selected is in the items that aren't sent
      if (selected >= bill.items.length)
        unpaidItems[selected - bill.items.length].seat_number = seat;
      itemsToRender[selected].seat = seat;
    }
    // eslint-disable-next-line
  }, [seat, itemsToRender]);
  const [editSeatToggle, setEditSeat] = useState(true);
  const [mod, setMod] = useState('');
  const [billItem, setBillItem] = useState(true);
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
      isAdmin={user.isAdmin}
      unpaidItems={unpaidItems}
      setBillItem={setBillItem}
      billItem={billItem}
      bill={bill}
    />
  ));
  return (
    <article className="bill-container">
      {editSeatToggle ? (
        <DragAndDrop
          tableInfo={tableInfo}
          bill={bill}
          itemsToRender={itemsToRender}
          tableInfo={tableInfo}
          updateBill={updateBill}
          bill={bill}
          setBill={setBill}
          menu={menu}
        />
      ) : (
        <div>
          <BillHeader table={tableInfo} />
          <ul className="bill-items">{billItems}</ul>
        </div>
      )}
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
            itemsToRender={itemsToRender}
          />
          <EditButton
            data={data}
            mod={mod}
            setMod={setMod}
            bill={bill}
            selected={selected}
            tableInfo={tableInfo}
          />
          <EditSeatButton
            data={data}
            editSeatToggle={editSeatToggle}
            setEditSeat={setEditSeat}
            tableInfo={tableInfo}
          />
          <PrintBillButton
            printBill={printBill}
            tableInfo={tableInfo}
            itemsToRender={itemsToRender}
            bill={bill}
            data={data}
          />
          <CancelButton
            setBill={setBill}
            setTable={setTable}
            clearBill={clearBill}
          />
        </div>
      </div>
    </article>
  );
}
