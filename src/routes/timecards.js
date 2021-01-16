const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("timecard route");
    db.query(`SELECT * FROM shifts;`)
      .then((data) => {
        const shifts = data.rows;
        res.send(shifts);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    console.log("post to timecard");
    const pin = req.body.pin;
    const login = req.body.login;
    db.query(
      `
        SELECT * FROM employees
        WHERE pin = $1;`,
      [pin]
    )
      .then((data) => {
        if (data.rows[0] !== undefined) {
          console.log(pin);
          db.query(
            `
            INSERT INTO shifts (employee_id, punch_time, is_in)
            VALUES ($1, CLOCK_TIMESTAMP(), $2);`,
            [pin, login]
          )
            .then((data) => {
              console.log("should work");
              res.status(200).send(data.rows);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ error: err.message });
            });
        } else {
          res.send(false);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
