const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //Get all punchs in/out
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM shifts;`)
      .then((data) => {
        const shifts = data.rows;
        res.send(shifts);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  //Creates a punch in/out
  router.post("/", (req, res) => {
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
          db.query(
            `
            INSERT INTO shifts (employee_id, punch_time, is_in)
            VALUES ($1, CLOCK_TIMESTAMP(), $2);`,
            [data.rows[0].id, login]
          )
            .then((data) => {
              res.status(200).send("Time punch accepted!");
            })
            .catch((err) => {
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
