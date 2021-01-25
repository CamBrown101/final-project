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
              AND day = '${day}';`,
      []
    )
      .then((data) => {
        console.log(data.rows);
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
        console.log(data.rows);
        res.status(200).send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
