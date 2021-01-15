const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("menu route");
    res.send("MENU ROUTE");
  });
  return router;
};
