const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //gets all shifts, probably dont need this
  router.get("/", (req, res) => {
    console.log("shifts route");
    db.query(`SELECT * FROM shifts;`)
      .then((data) => {
        const shifts = data.rows;
        res.send(shifts);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //get most recent shift for employee
  router.get("/:id", (req, res) => {
    console.log("employee shifts");
    const employee = req.params.id;
    db.query(
      `
      SELECT * FROM shifts
      WHERE employee_id = $1;`,
      [employee]
    )
      .then((data) => {
        const employee = data.rows[data.rows.length - 1];
        res.send(employee);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
