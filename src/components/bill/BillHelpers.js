import Axios from '../../helpers/axios';

//Adds new items for an order to the database
export const sendBill = (tableInfo, data) => {
  return Axios.post(`api/orders/${tableInfo.orderId}/items`, data);
};

//Updates the seat number of an order item.
export const updateBill = (tableInfo, data) => {
  return Axios.post(`api/orders/${tableInfo.orderId}/seat-update`, data);
};

//Converts the bill into html to send in an email
export const formatBillToPrint = (billToPrint) => {
  let formattedBill =
    '<head><style>h3{margin-bottom:0;}.item{margin:0;font-size:1.25em;}p{margin:0;font-size:1.5em}.total{font-size:2em;}.footer{margin-top:5%;}</style></head><div style="border:thin solid black; padding:3%; width:220px">';
  if (billToPrint && billToPrint.items && billToPrint.total) {
    billToPrint.items.forEach((item) => {
      formattedBill += `
    <div class="item" style="display:flex;">
      <h3>${item.name}</h3>
      <h3>: ${item.price}</h3>
    </div>
      `;
    });
  }
  formattedBill += `
    <div class="footer" style="text-align: right;">      
      <p>Subtotal: $${billToPrint.subtotal.toFixed(2)}</p>
      <p>Tax: $${billToPrint.tax.toFixed(2)}</p>
      <p class="total">Total: $${billToPrint.total.toFixed(2)}</p>
    </div>
  </div>
  `;
  return formattedBill;
};

//Sends bill to customer's email
export const printBill = (emails, billsBySeat, table) => {
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

//clears the bill being displayed
export const clearBill = (setBill, setTable) => {
  setBill({
    items: [],
    tax: 0,
    subtotal: 0,
    total: 0,
  });
  setTable([]);
};

//Mark items in the db as paid for a given order
export const payBill = (orderId, unpaidItems) => {
  if (orderId !== null) {
    Axios.post(`/api/orders/${orderId}/pay`, {
      paymentType: 'credit',
    });
  }

  const orderIds = [];
  unpaidItems.forEach((element) => {
    orderIds.push(element.orderItemId ? element.orderItemId : element.id);
  });
  return Axios.post('api/orders/pay', orderIds);
};

//Creates a data object from the bill for use in axios calls
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

//Retuns an array of unpaid items
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

//Returns an array of items to render on the bill
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

//Returns an array of objects, with each order item divided by seat
//Index 0 will have information for the entire table
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
