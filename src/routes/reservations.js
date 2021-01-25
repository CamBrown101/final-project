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

  return router;
};
