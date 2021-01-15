const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("table route");
    db.query(`SELECT * FROM tables;`)
      .then((data) => {
        const tables = data.rows;
        res.send(tables);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
