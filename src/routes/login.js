const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get('/', (req, res) => {
    const pin = req.body.pin;

    //query user from db
    db.query(
      `SELECT * FROM employees
            WHERE pin = $1;`,
      [pin]
    )
      .then((data) => {
        const hashedPin = data.rows[0].pin;
        const bcryptCheck = bcrypt.compareSync(pin, hashedPin);
        if (bcryptCheck) {
          res.status(200).send(data.rows[0]);
        } else {
          req.session = null;
          res.send(false);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
