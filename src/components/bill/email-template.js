let formattedBill =
  '<!DOCTYPE html><html><head><style>body {background-color: powderblue;}h1 {color: blue;}p {color: red;}</style></head><body>';
formattedBill += `
    <div style="display: flex; flex-direction: column">
      `;
if (billToPrint && billToPrint.items && billToPrint.total) {
  billToPrint.items.forEach((item) => {
    formattedBill += `
      <div style="display: flex">
        <h3>${item.name}</h3>
        <h3>: ${item.price}</h3>
      </div>
      `;
  });
}
formattedBill += `
    </div>
    <div style="display: flex">
      <p>Subtotal: ${billToPrint.subtotal.toFixed(2)}</p>
    </div>
    <div style="display: flex">
      <p>Tax: ${billToPrint.tax.toFixed(2)}</p>
    </div>
    <div style="display: flex">
      <p>Total: ${billToPrint.total.toFixed(2)}</p>
    </div>
  </body>
  </html>
  `;
