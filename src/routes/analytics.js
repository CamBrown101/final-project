const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //gets all shifts
  router.get("/labour", (req, res) => {
    console.log("shifts route");
    db.query(
      `SELECT *
      from (SELECT 
            is_in,
            punch_time,
            employee_id,
            punch_time as clockInTime,
            LEAD(punch_time) OVER (PARTITION BY employee_id order By id) as clockOutTime
      FROM shifts) AS foo
      where is_in = true;`
    )
      .then((data) => {
        const shifts = data.rows;
        res.send(shifts);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/sales", (req, res) => {
    console.log("sales route");
    const days = req.query.days;
    const queryString = `
      SELECT price, timestamp from order_items
      JOIN menu_items ON order_items.item= menu_items.id
      WHERE timestamp > now() - interval '${days} day'
      ;`;
    db.query(queryString)
      .then((data) => {
        const shifts = data.rows;
        res.send(shifts);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/gross-sales", (req, res) => {
    console.log("gross sales route");
    const days = req.query.days;
    const queryString = `
      SELECT sum(price), CAST(timestamp AS DATE) from order_items
      JOIN menu_items ON order_items.item= menu_items.id
      WHERE timestamp > now() - interval '${days} day'
      GROUP BY CAST(timestamp AS DATE)
      ORDER BY timestamp;`;
    db.query(queryString)
      .then((data) => {
        const shifts = data.rows;
        res.send(shifts);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
