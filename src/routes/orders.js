const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log('order route');
    db.query(`SELECT * FROM orders;`)
      .then((data) => {
        const orders = data.rows;
        res.send(orders);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //sends the order object
  router.get('/:id', (req, res) => {
    console.log('order id route');
    const order = req.params.id;
    db.query(
      `SELECT * FROM orders
              WHERE id = $1;`,
      [order]
    )
      .then((data) => {
        const order = data.rows[0];
        res.send(order);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //WIP sends items in an order
  router.get('/:id/items', (req, res) => {
    console.log('order id items route');
    const order = req.params.id;
    db.query(
      `
      SELECT * FROM order_items
      JOIN orders ON order_id = orders.id
      WHERE orders.id = $1;`,
      [order]
    )
      .then((data) => {
        const items = data.rows;
        res.send(items);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // INSERT INTO order_items(order_id, seat_id, item)
  // INSERT INTO orders(employee_id, table_id)

  router.post('/:id/items', (req, res) => {
    console.log('order id items postroute');
    const queryString = `
    `;
    const queryParams = req.params;

    db.query(queryString, queryParams)
      .then((data) => {
        const items = data.rows;
        res.send(items);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
