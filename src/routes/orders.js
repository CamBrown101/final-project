const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
module.exports = (db) => {
  //Get all orders
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM orders;`)
      .then((data) => {
        const orders = data.rows;
        res.send(orders);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Create an order
  router.post("/", (req, res) => {
    db.query(
      `
              INSERT INTO orders (employee_id, table_id)
              VALUES ($1, $2);`,
      [req.body.id, req.body.tableId]
    )
      .then((data) => {
        const order = data.rows;
        res.send(order);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Get orders and order items for production screen
  router.get("/production", (req, res) => {
    const isFood = req.query.is_food;
    db.query(
      `
      SELECT order_items.*, menu_items.name
      FROM order_items
      JOIN menu_items on order_items.item = menu_items.id
      JOIN categories on menu_items.category_id = categories.id
      WHERE order_items.is_made IS False
      AND categories.is_food = $1;
              `,
      [isFood]
    )
      .then((data) => {
        const orders = data.rows;
        res.send(orders);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Marks all requested items as sold
  router.post("/pay", (req, res) => {
    const items = req.body;
    let queryString = `
              UPDATE order_items
              SET is_payed = true
              WHERE `;
    for (let i = 0; i < items.length; i++) {
      queryString += `id = ${items[i]}`;
      queryString += i === items.length - 1 ? ` RETURNING *;` : ` OR `;
    }
    db.query(queryString, [])
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Sends a specific order
  router.get("/:id", (req, res) => {
    const order = req.params.id;
    db.query(
      `SELECT * FROM orders
              WHERE id = $1;`,
      [order]
    )
      .then((data) => {
        const order = data.rows[0];
        res.send(order);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Get all the items in one order
  router.get("/:id/items", (req, res) => {
    const order = req.params.id;
    db.query(
      `
      SELECT *, order_items.id AS order_item_id FROM order_items
      JOIN orders ON order_id = orders.id
      WHERE orders.id = $1;`,
      [order]
    )
      .then((data) => {
        const items = data.rows;
        res.send(items);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Add items to an order
  router.post("/:id/items", (req, res) => {
    const items = req.body.itemId;
    const seat = req.body.seatId;
    const order = req.body.orderId;
    const mods = req.body.mods;
    let queryString = `INSERT INTO order_items (order_id, seat_number, item, mods)
    VALUES `;
    for (let i = 0; i < items.length; i++) {
      queryString += ` (${order}, ${seat[i]}, ${items[i]}, '${mods[i]}')`;
      if (i !== items.length - 1) {
        queryString += ",";
      } else {
        queryString += " RETURNING *;";
      }
    }
    db.query(queryString)
      .then((data) => {
        const items = data.rows;
        res.send(items);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Mark a specific order as paid
  router.post("/:id/pay", (req, res) => {
    const payType = req.body.paymentType;
    const order = req.params.id;
    db.query(
      `
              UPDATE orders
              SET payment_type = $1
              WHERE id = $2`,
      [payType, order]
    )
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //remove items from an order
  router.post("/:id/delete", (req, res) => {
    const orderItemId = req.params.id;
    const queryString = `DELETE FROM order_items
    WHERE id = $1;`;
    db.query(queryString, [orderItemId]).catch((err) => {
      res.status(500).json({ error: err.message });
    });
  });

  //Send an email receipt for an order
  router.post("/:id/email", (req, res) => {
    const email = req.body.email;
    const order = req.params.id;
    let mailText = req.body.bill;
    db.query(
      `
              UPDATE orders
              SET email = $1
              WHERE id = $2`,
      [email, order]
    ).then((data) => {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "buyfoodsellfood@gmail.com",
          pass: "BuyFoodSellFood2!",
        },
      });

      const mailOptions = {
        from: "buyfoodsellfood@gmail.com",
        to: email,
        subject: "Your order reciept",
        html: mailText,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).send(error);
        } else {
          res.send("email sent!");
        }
      });
    });
  });

  //Mark items on an order as made
  router.post("/:id/make", (req, res) => {
    const order = req.params.id;
    db.query(
      `
              UPDATE order_items
              SET is_made = TRUE
              WHERE order_id = $1`,
      [order]
    )
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Change the seat number for an order item
  router.post("/:id/seat-update", (req, res) => {
    const order = req.params.id;
    const itemToUpdate = req.body.item;
    const seat = req.body.seat;
    db.query(
      `
              UPDATE order_items
              SET seat_number = $3
              WHERE order_id = $1 AND id = $2`,
      [order, itemToUpdate, seat]
    )
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
