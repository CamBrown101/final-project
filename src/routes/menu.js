const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //get all menu items
  router.get("/", (req, res) => {
    db.query(
      `
              SELECT menu_items.*, categories.name AS category
              FROM menu_items
              JOIN categories ON menu_items.category_id = categories.id;`
    )
      .then((data) => {
        const menu = data.rows;
        res.send(menu);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //get specific menu item
  router.get("/:id", (req, res) => {
    const item = req.params.id;
    db.query(
      `SELECT * FROM menu_items
              WHERE id = $1;`,
      [item]
    )
      .then((data) => {
        const item = data.rows[0];
        res.send(item);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Create a menu item
  router.post("/", (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const quantity = req.body.quantity;
    const isActive = req.body.isActive;
    const category = req.body.category;

    db.query(
      `SELECT * FROM categories
              WHERE name = $1;`,
      [category]
    ).then((data) => {
      const categoryName = data.rows[0].id;
      const queryParams = [
        name,
        price,
        description,
        quantity,
        isActive,
        categoryName,
      ];

      db.query(
        `INSERT INTO menu_items (name, price, description, quantity, is_active, category_id)
              VALUES ($1, $2, $3, $4, $5, $6)
              RETURNING *;`,
        queryParams
      )
        .then((data) => {
          const employee = data.rows[0];
          return res.status(200).send(employee);
        })
        .catch((err) => {
          return res.status(500).send("error");
        });
    });
  });

  return router;
};
