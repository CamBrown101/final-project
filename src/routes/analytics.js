const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //gets all shifts
  router.get("/labour", (req, res) => {
    console.log("shifts route");
    db.query(
      `SELECT foo.*, employees.wage
      from (SELECT 
          is_in,
          punch_time,
          employee_id,
          punch_time as clockInTime,
          LEAD(punch_time) OVER (PARTITION BY employee_id order By id) as clockOutTime
       FROM shifts) AS foo
      JOIN employees ON employee_id = employees.id
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
    SELECT menu_items.name, count(menu_items.name) AS sold
    FROM menu_items
    Join order_items ON menu_items.id = order_items.item
    JOIN categories ON categories.id = menu_items.category_id
    WHERE timestamp > now() - interval '${days} day'
    Group BY menu_items.name
    ORDER BY sold DESC
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
