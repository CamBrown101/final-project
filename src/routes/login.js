const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const pin = req.body.pin;
    db.query(
      `SELECT * FROM employees
            WHERE pin = $1;`,
      [pin]
    )
      .then((data) => {
        if (data.rows) {
          res.status(200).send(data.rows[0]);
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
