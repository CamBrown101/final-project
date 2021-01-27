const express = require('express');
const router = express.Router();

module.exports = (db) => {
<<<<<<< HEAD
  router.get('/', (req, res) => {
    console.log('table route');
=======
  //Get information on all tables
  router.get("/", (req, res) => {
>>>>>>> 20ce730629a64c5d3cb9e952be55b1678c38e5e7
    db.query(
      `SELECT tables.*, employees.firstName FROM tables
      JOIN employees On employee_id = employees.id
      ORDER BY id;`
    )
      .then((data) => {
        const tables = data.rows;
        res.send(tables);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

<<<<<<< HEAD
  router.get('/open', (req, res) => {
    db.query(
      `SELECT * FROM orders
    WHERE payment_type IS NULL;`,
      []
    )
      .then((data) => {
        const tables = data.rows;
        res.send(tables);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get('/:id', (req, res) => {
    console.log('table id route');
=======
  //Get info on a specific table
  router.get("/:id", (req, res) => {
>>>>>>> 20ce730629a64c5d3cb9e952be55b1678c38e5e7
    const table = req.params.id;
    db.query(
      `SELECT * FROM tables
              WHERE id = $1;`,
      [table]
    )
      .then((data) => {
        const table = data.rows[0];
        res.send(table);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //seats for a table
<<<<<<< HEAD
  router.get('/:id/seats', (req, res) => {
    console.log('table id items route');
=======
  router.get("/:id/seats", (req, res) => {
>>>>>>> 20ce730629a64c5d3cb9e952be55b1678c38e5e7
    const table = req.params.id;
    db.query(
      `
      SELECT * FROM seats
      JOIN tables ON table_id = tables.id
      WHERE tables.id = $1;`,
      [table]
    )
      .then((data) => {
        const seats = data.rows;
        res.send(seats);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

<<<<<<< HEAD
  router.get('/:id/current-order', (req, res) => {
    console.log('table id items route');
=======
  //Get the current order on a table
  router.get("/:id/current-order", (req, res) => {
>>>>>>> 20ce730629a64c5d3cb9e952be55b1678c38e5e7
    const table = req.params.id;
    db.query(
      `
      SELECT * FROM orders
      WHERE table_id = $1 AND payment_type IS NULL;`,
      [table]
    )
      .then((data) => {
        const latestOrder = data.rows[data.rows.length - 1];
        res.send(latestOrder);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
