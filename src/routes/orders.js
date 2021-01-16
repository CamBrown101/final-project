const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("order route");
    db.query(`SELECT * FROM orders;`)
      .then((data) => {
        const orders = data.rows;
        res.send(orders);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    console.log(req);
    console.log("order route");
    db.query(
      `
              INSERT INTO orders (employee_id, table_id)
              VALUES ($1, $2);`,
      [req.body.id, req.body.tableId]
    )
      .then((data) => {
        const order = data.rows;
        res.send(order);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/pay", (req, res) => {
    console.log(req);
    const items = req.body;
    let queryString = `
              UPDATE order_items
              SET is_payed = true
              WHERE `;
    for (let i = 0; i < items.length; i++) {
      queryString += `id = ${items[i]}`;
      queryString += i === items.length - 1 ? `;` : ` OR `;
    }
    console.log(queryString);
    db.query(queryString, [])
      .then((data) => {
        res.status(200);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //sends the order object
  router.get("/:id", (req, res) => {
    console.log("order id route");
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
  router.get("/:id/items", (req, res) => {
    console.log("order id items route");
    const order = req.params.id;
    db.query(
      `
      SELECT *, order_items.id AS order_item_id FROM order_items
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

  router.post("/:id/items", (req, res) => {
    const items = req.body.itemId;
    const seat = req.body.seatId;
    const order = req.body.orderId;

    let queryString = `INSERT INTO order_items (order_id, seat_id, item)
    VALUES `;
    for (let i = 0; i < items.length; i++) {
      queryString += ` (${order}, ${seat}, ${items[i]})`;
      if (i !== items.length - 1) {
        queryString += ",";
      } else {
        queryString += "RETURNING * ;";
      }
    }
    console.log(queryString);
    db.query(queryString)
      .then((data) => {
        console.log(data);
        const items = data.rows;
        res.send(items);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
