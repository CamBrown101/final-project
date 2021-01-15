const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("menu route");
    console.log("user route");
    db.query(`SELECT * FROM menu_items;`)
      .then((data) => {
        const menu = data.rows;
        res.send(menu);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
