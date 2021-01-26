const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Info on all employees
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM employees;`)
      .then((data) => {
        const employees = data.rows;
        res.send(employees);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Info on a specific employee
  router.get("/:id", (req, res) => {
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

  //create an employee
  router.post("/", (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const pin = parseInt(req.body.pin);
    const is_admin = req.body.isAdmin;

    db.query(
      `SELECT * FROM employees
              WHERE email = $1;`,
      [email]
    )
      .then((data) => {
        if (data.rows[0] !== undefined) {
          return res.send("exists");
        }

        const queryParams = [firstName, lastName, email, pin, is_admin];
        db.query(
          `INSERT INTO employees (firstName, lastName, email, pin, start_date, is_admin)
              VALUES ($1, $2, $3, $4, CLOCK_TIMESTAMP(), $5)
              RETURNING *;`,
          queryParams
        )
          .then((data) => {
            const employee = data.rows[0];
            return res.status(200).send(employee);
          })
          .catch((err) => {
            return res.status(500).send("error");
          });
      })
      .catch();
  });
  return router;
};
