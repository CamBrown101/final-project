import Axios from "axios";

export const sendBill = (tableInfo, data) => {
  return Axios.post(`api/orders/${tableInfo.orderId}/items`, data);
};

export const formatBillToPrint = (billToPrint, bill) => {
  let formattedBill = "";
  billToPrint.forEach(
    (item) =>
      (formattedBill += `<div style="display:flex;"><h3>${item.name}</h3><h3>: ${item.price}</h3></div><br></br>`)
  );
  formattedBill += `<div style="display:flex;"> <p>Subtotal: ${bill.subtotal.toFixed(
    2
  )}</p></div><br></br>`;
  formattedBill += `<div style="display:flex;"> <p>Tax: ${bill.tax.toFixed(
    2
  )}</p></div><br></br>`;
  formattedBill += `<div style="display:flex;"> <p>Total: ${bill.total.toFixed(
    2
  )}</p></div><br></br>`;

  return formattedBill;
};

export const printBill = (email, items, table) => {
  const data = {
    email: email,
    bill: formatBillToPrint(items),
  };
  Axios.post(`/api/orders/${table.orderId}/email`, data);
};

export const clearBill = (setBill, setTable) => {
  setBill({
    items: [],
    tax: 0,
    subtotal: 0,
    total: 0,
  });
  setTable([]);
};

export const payBill = (orderId, unpaidItems, stateItems) => {
  Axios.post(`/api/orders/${orderId}/pay`, {
    paymentType: "credit",
  });
  const orderIds = [];
  unpaidItems = [...unpaidItems, ...stateItems];
  unpaidItems.forEach((element) => {
    orderIds.push(element.order_item_id);
  });
  return Axios.post("api/orders/pay", orderIds);
};

export const getBillData = (orderId, items) => {
  const data = {
    itemId: [],
    seatId: [],
    orderId: orderId,
    mods: [],
  };
  items.forEach((item) => {
    data.itemId.push(item.id);
    data.mods.push(item.mods ? item.mods : null);
    data.seatId.push(item.seat);
  });
};
