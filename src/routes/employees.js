const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("employee route");
    db.query(`SELECT * FROM employees;`)
      .then((data) => {
        const employees = data.rows;
        res.send(employees);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Might be redundant with login route
  router.get("/:id", (req, res) => {
    console.log("employee id route");
    const employee = req.params.id;
    db.query(
      `SELECT * FROM employees
              WHERE id = $1;`,
      [employee]
    )
      .then((data) => {
        const employee = data.rows[0];
        res.send(employee);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
