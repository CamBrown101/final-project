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
  return router;
};
