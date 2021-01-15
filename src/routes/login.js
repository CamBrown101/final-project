const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.post('/', (req, res) => {
    const pin = req.body.pin;
    //query user from db
    const hashedPin = bcrypt.hashSync(pin, 1);
    console.log(hashedPin);
    db.query(
      `SELECT * FROM employees
            WHERE pin = $1;`,
      [hashedPin]
    )
      .then((data) => {
        if (data.rows) {
          res.status(200).send(data.rows);
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
