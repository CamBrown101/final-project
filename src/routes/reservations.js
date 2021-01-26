const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM reservations;`, [])
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/day', (req, res) => {
    const table = req.body.table;
    const day = req.body.day;
    console.log(table, day);
    db.query(
      `SELECT * FROM reservations
              WHERE table_id = ${table}
              AND day = '${day}'
              AND closed = false;`,
      []
    )
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/all', (req, res) => {
    const day = req.body.day;
    console.log(day);
    db.query(
      `SELECT * FROM reservations
              WHERE day = $1
              AND closed = false
              ORDER BY hour;`,
      [day]
    )
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    const table_id = req.body.table;
    const name = req.body.name;
    const phone = req.body.phone;
    const hour = req.body.hour;
    const minute = req.body.minute;
    const day = req.body.day;
    const seats = req.body.seats;

    db.query(
      `INSERT INTO reservations (table_id, name, phone, hour, minute, day, seats)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;`,
      [table_id, name, phone, hour, minute, day, seats]
    )
      .then((data) => {
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/close', (req, res) => {
    const table = req.body.table;
    const day = req.body.day;
    const hour = req.body.hour;
    console.log(table, day, hour);
    console.log(table, day);
    db.query(
      `UPDATE reservations SET
      closed = true
      WHERE table_id = $1
      AND day = $2
      AND hour = $3
      RETURNING *;`,
      [table, day, hour]
    )
      .then((data) => {
        console.log(data.rows);
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
