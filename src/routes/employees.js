const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log('employee route');
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
  router.get('/:id', (req, res) => {
    console.log('employee id route');
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

  router.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const pin = req.body.pin;
    const is_admin = req.body.isAdmin;
    const hashedPin = bcrypt.hash(pin, 10);

    console.log(req.body);
    db.query(
      `SELECT * FROM employees
              WHERE email = $1;`,
      [email]
    )
      .then((data) => {
        if (data.rows[0] !== undefined) {
          return res.send('exists');
        }

        const queryParams = [firstName, lastName, email, hashedPin, is_admin];
        console.log(queryParams);
        db.query(
          `INSERT INTO employees (firstName, lastName, email, pin, start_date, is_admin)
              VALUES ($1, $2, $3, $4, CLOCK_TIMESTAMP(), $5)
              RETURNING *;`,
          queryParams
        )
          .then((data) => {
            const employee = data.rows[0];
            console.log(employee);
            return res.status(200).send(employee);
          })
          .catch((err) => {
            console.log('error');
            return res.status(500).send('error');
          });
      })
      .catch();
  });
  return router;
};
