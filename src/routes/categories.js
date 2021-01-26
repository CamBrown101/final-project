const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Get info for all categories
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM categories;`, [])
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Create a category
  router.post("/", (req, res) => {
    const name = req.body.name;
    const is_food = req.body.isFood;
    const queryParams = [name, is_food];
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
