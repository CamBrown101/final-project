const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("user route");
    db.query(`SELECT * FROM employees;`)
      .then((data) => {
        const employees = data.rows;
        res.send(employees);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
