const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query('SELECT * FROM layout;', [])
      .then((data) => {
        console.log(data.rows);
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
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
        console.log(data.rows);
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
