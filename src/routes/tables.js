const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //Get information on all tables
  router.get('/', (req, res) => {
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
  router.get('/:id/seats', (req, res) => {
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

  //Get the current order on a table
  router.get('/:id/current-order', (req, res) => {
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
