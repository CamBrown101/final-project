const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //gets all shifts
  router.get("/labour", (req, res) => {
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

  //Gets a count of sales for each menu item in a span of days
  router.get("/sales", (req, res) => {
    const days = req.query.days;
    const queryString = `
    SELECT menu_items.name, count(menu_items.name) AS sold, categories.is_food
    FROM menu_items
    Join order_items ON menu_items.id = order_items.item
    JOIN categories ON categories.id = menu_items.category_id
    WHERE timestamp > now() - interval '${days} day'
    Group BY menu_items.name, categories.is_food
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

  //Gets the total dollar amount of sales in a span of days
  router.get("/gross-sales", (req, res) => {
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
