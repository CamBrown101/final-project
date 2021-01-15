const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("table route");
    res.send("TABLES ROUTE");
  });
  return router;
};
