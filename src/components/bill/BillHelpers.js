import Axios from "axios";

export const sendBill = (tableInfo, data) => {
  return Axios.post(`api/orders/${tableInfo.orderId}/items`, data);
};

export const updateBill = (tableInfo, data) => {
  return Axios.post(`api/orders/${tableInfo.orderId}/seat-update`, data);
};

export const formatBillToPrint = (billToPrint) => {
  let formattedBill = "";
  if (billToPrint && billToPrint.items && billToPrint.total) {
    billToPrint.items.forEach((item) => {
      formattedBill += `<div style="display:flex;"><h3>${item.name}</h3><h3>: ${item.price}</h3></div><br></br>`;
    });
    formattedBill += `<div style="display:flex;"> <p>Subtotal: ${billToPrint.subtotal.toFixed(
      2
    )}</p></div><br></br>`;
    formattedBill += `<div style="display:flex;"> <p>Tax: ${billToPrint.tax.toFixed(
      2
    )}</p></div><br></br>`;
    formattedBill += `<div style="display:flex;"> <p>Total: ${billToPrint.total.toFixed(
      2
    )}</p></div><br></br>`;
    return formattedBill;
  }
};

export const printBill = (emails, billsBySeat, table) => {
  // console.log(formatBillToPrint(billsBySeat));

  emails.forEach((ele, index) => {
    if (ele) {
      const data = {
        email: ele,
        bill: formatBillToPrint(billsBySeat[index]),
      };
      Axios.post(`/api/orders/${table.orderId}/email`, data);
    }
  });
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

export const payBill = (orderId, unpaidItems) => {
  Axios.post(`/api/orders/${orderId}/pay`, {
    paymentType: "credit",
  });
  const orderIds = [];
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
  return data;
};

export const getUnpaidItems = (allItems) => {
  let unpaidItems = [];
  let itemsOnBill = { ...allItems };
  itemsOnBill = itemsOnBill[0];
  if (itemsOnBill) {
    itemsOnBill.forEach((element) => {
      if (!element.is_payed) {
        unpaidItems.push(element);
      }
    });
  }
  return unpaidItems;
};

export const getItemsToRender = (itemsOnBill, unpaidItems, menu) => {
  const billCopy = [...itemsOnBill];
  let itemsToRender = [...billCopy.reverse()];
  if (unpaidItems) {
    for (let item of unpaidItems) {
      menu.forEach((element) => {
        if (element.id === item.item) {
          const elementCopy = { ...element };
          elementCopy.mods = item.mods;
          elementCopy.seat = item.seat_number;
          elementCopy.orderItemId = item.order_item_id;
          itemsToRender.push(elementCopy);
        }
      });
    }
  }
  return itemsToRender;
};

export const totalBillsBySeat = (itemsToRender, bill, tableInfo) => {
  const billsBySeat = [
    {
      items: [...itemsToRender],
      subtotal: bill.subtotal,
      tax: bill.tax,
      total: bill.total,
    },
  ];
  //creates empty objects per seat on table
  for (let i = 1; i <= tableInfo.seats; i++) {
    billsBySeat.push({ items: [], subtotal: 0, tax: 0, total: 0 });
  }
  //adds totals to billsBySeat array where index = seatnumber 0 being bill total
  itemsToRender.forEach((element) => {
    let seatNumber = element.seat;
    if (billsBySeat[seatNumber]) {
      billsBySeat[seatNumber].items.push(element);
      billsBySeat[seatNumber].subtotal += element.price;
      billsBySeat[seatNumber].tax += element.price * 0.13;
      billsBySeat[seatNumber].total += element.price * 1.13;
    }
  });

  //This is a test function to compare bill totals equal overall total
  // const checkTotal = () => {
  //   let itemTotal = 0;
  //   for (let i = 1; i < billsBySeat.length; i++) {
  //     itemTotal += billsBySeat[i].total;
  //   }

  //   return itemTotal.toFixed(2) === billsBySeat[0].total.toFixed(2);
  // };
  // console.log(checkTotal());
  return billsBySeat;
};
