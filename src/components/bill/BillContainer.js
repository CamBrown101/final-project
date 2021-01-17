import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./BillContainer.scss";
import BillHeader from "./BillHeader";
import BillItem from "./BillItem";

export default function BillContainer({
  bill,
  setBill,
  setTable,
  tableInfo,
  menu,
}) {
  const [selected, setSelected] = useState(null);
  const data = { itemId: [], seatId: 1, orderId: tableInfo.orderId, mods: [] };
  bill.items.forEach((item) => {
    data.itemId.push(item.id);
    data.mods.push(item.mods ? item.mods : null);
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
  console.log(selected);
  const payBill = () => {
    Axios.post(`/api/orders/${tableInfo.orderId}/pay`, {
      paymentType: "credit",
    });
    const orderIds = [];
    unpaidItems = [...unpaidItems, ...bill.items];
    unpaidItems.forEach((element) => {
      orderIds.push(element.order_item_id);
    });
    return Axios.post("api/orders/pay", orderIds);
  };
  const printBill = () => {
    const data = { email: email, bill: `test test` };
    Axios.post(`/api/orders/${tableInfo.orderId}/email`, data);
  };
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
          itemsToRender.push(element);
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
  console.log(itemsToRender);
  const billItems = itemsToRender.map((item, index) => (
    <BillItem
      key={index}
      id={index}
      name={item.name}
      price={item.price}
      selected={selected}
      setSelected={setSelected}
      mods={item.mods}
    />
  ));
  const [inputToggle, setInputToggle] = useState("hide");
  const [mod, setMod] = useState("");
  const [printToggle, setPrintToggle] = useState("hide");
  const [email, setEmail] = useState("");
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
            className="send-button button"
            onClick={() => {
              sendBill().then(clearBill);
            }}
          >
            <p>Send</p>
          </div>
          <button
            className="cancel-button button"
            onClick={() => {
              clearBill();
            }}
          >
            Cancel
          </button>

          <button
            className="pay-button button"
            onClick={() => {
              if (bill.items.length !== 0) {
                sendBill().then(() => {
                  payBill().then(clearBill);
                });
              } else {
                payBill().then(clearBill);
              }
            }}
          >
            Pay
          </button>

          <div className="edit-section">
            <button
              className="edit-button button"
              onClick={() => {
                inputToggle === "hide"
                  ? setInputToggle("show")
                  : setInputToggle("hide");
              }}
            >
              Edit
            </button>
            <input
              value={mod}
              className={inputToggle + " edit-input"}
              onChange={(event) => {
                setMod(event.target.value);
              }}
            ></input>
            <div className="confirm-cancel-buttons">
              <button
                className={inputToggle + " button send-button"}
                onClick={() => {
                  if (selected < bill.items.length)
                    bill.items[bill.items.length - 1 - selected].mods = mod;
                  setMod("");
                }}
              >
                Confrim
              </button>
              <button
                className={inputToggle + " button cancel-button"}
                onClick={() => setMod("")}
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="print-section">
            <button
              className="print-button button"
              onClick={() => {
                inputToggle === "hide"
                  ? setPrintToggle("show")
                  : setPrintToggle("hide");
              }}
            >
              Print
            </button>
            <input
              value={email}
              className={printToggle + " edit-input"}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            ></input>
            <div className="confirm-cancel-buttons">
              <button
                className={printToggle + " button send-button"}
                onClick={() => {
                  printBill();
                  setEmail("");
                }}
              >
                Confrim
              </button>
              <button
                className={printToggle + " button cancel-button"}
                onClick={() => setEmail("")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
