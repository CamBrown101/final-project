const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    console.log('menu route');
    db.query(`SELECT * FROM menu_items;`)
      .then((data) => {
        const menu = data.rows;
        res.send(menu);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get('/:id', (req, res) => {
    console.log('menu item id route');
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

  router.post('/', (req, res) => {
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
      console.log(queryParams);

      db.query(
        `INSERT INTO menu_items (name, price, description, quantity, is_active, category_id)
              VALUES ($1, $2, $3, $4, $5, $6)
              RETURNING *;`,
        queryParams
      )
        .then((data) => {
          const employee = data.rows[0];
          console.log(employee);
          return res.status(200).send(employee);
        })
        .catch((err) => {
          console.log('error');
          return res.status(500).send('error');
        });
    });
  });

  return router;
};
