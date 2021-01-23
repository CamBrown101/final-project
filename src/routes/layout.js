const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query('SELECT * FROM layout;', [])
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put('/', (req, res) => {
    const id = req.body.id;
    const x_pos = req.body.x_pos;
    const y_pos = req.body.y_pos;
    db.query(
      `UPDATE layout
                SET x_pos = ${x_pos},
                y_pos = ${y_pos} 
                WHERE id = ${id}
                RETURNING *;`,
      []
    )
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.delete('/', (req, res) => {
    const id = req.body.id;
    db.query(
      `DELETE FROM layout
      WHERE id = ${id}
      RETURNING *;`,
      []
    )
      .then((data) => {
        res.send(data.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.delete('/reset', (req, res) => {
    db.query(
      `DELETE FROM layout
      WHERE true
      RETURNING *;
      `,
      []
    )
      .then((data) => {
        res.send(data.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //resets psql auto increment id counter
  router.delete('/counter', (req, res) => {
    db.query(
      `SELECT SETVAL((SELECT pg_get_serial_sequence('layout', 'id')), 1, false);`,
      []
    )
      .then((data) => {
        res.send(data.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post('/', (req, res) => {
    db.query(
      `INSERT INTO layout (x_pos, y_pos)
      VALUES (0, 0);`,
      []
    )
      .then((data) => {
        res.send('New table added');
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
