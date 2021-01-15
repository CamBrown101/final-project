const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM categories;`, [])
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    const name = req.body.name;
    const is_food = req.body.isFood;
    const queryParams = [name, is_food];
    console.log(queryParams);
    db.query(
      `INSERT INTO categories (name, is_food)
    VALUES ($1, $2)
    RETURNING *;`,
      queryParams
    )
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
