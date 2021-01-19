const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log("order route");
    db.query(`SELECT * FROM orders;`)
      .then((data) => {
        const orders = data.rows;
        res.send(orders);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    console.log("order route");
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

  router.get("/production", (req, res) => {
    //const isFood = req.body.isFood;
    const isFood = true;
    console.log("Get Production Screen");
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
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/pay", (req, res) => {
    const items = req.body;
    console.log("\n\n\n\n\n");
    console.log(req.body);
    let queryString = `
              UPDATE order_items
              SET is_payed = true
              WHERE `;
    for (let i = 0; i < items.length; i++) {
      queryString += `id = ${items[i]}`;
      queryString += i === items.length - 1 ? ` RETURNING *;` : ` OR `;
    }
    console.log(queryString);
    db.query(queryString, [])
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log("\n\n\n\n\n");
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

  //sends the order object
  router.get("/:id", (req, res) => {
    console.log("order id route");
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

  //WIP sends items in an order
  router.get("/:id/items", (req, res) => {
    console.log("order id items route");
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
    console.log(queryString);
    db.query(queryString)
      .then((data) => {
        const items = data.rows;
        res.send(items);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      });
  });

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
          console.log(error);
          res.status(500).send(error);
        } else {
          console.log("Email sent: " + info.response);
          res.send("email sent!");
        }
      });
    });
  });

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

  return router;
};
