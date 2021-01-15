const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("user route");
    res.send("USER ROUTE");
  });
  return router;
};
