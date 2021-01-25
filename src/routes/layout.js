const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query('SELECT * FROM tables;', [])
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put('/', (req, res) => {
    const id = req.body.id;
    const x_pos = req.body.x_pos;
    const y_pos = req.body.y_pos;
    db.query(
      `UPDATE tables
                SET x_pos = ${x_pos},
                y_pos = ${y_pos} 
                WHERE id = ${id}
                RETURNING *;`,
      []
    )
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put('/seats', (req, res) => {
    const id = req.body.id;
    const number_of_seats = req.body.number_of_seats;
    db.query(
      `UPDATE tables SET
                number_of_seats = $2
                WHERE id = $1
                RETURNING *;`,
      [id, number_of_seats]
    )
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put('/employee', (req, res) => {
    const id = req.body.id;
    const employee_id = req.body.employee_id;
    db.query(
      `UPDATE tables SET
                employee_id = $2
                WHERE id = $1
                RETURNING *;`,
      [id, employee_id]
    )
      .then((data) => {
        console.log(data.rows);
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.delete('/', (req, res) => {
    const id = req.body.id;
    db.query(
      `DELETE FROM tables
      WHERE id = ${id}
      RETURNING *;`,
      []
    )
      .then((data) => {
        res.send(data.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.delete('/reset', (req, res) => {
    db.query(
      `DELETE FROM tables
      WHERE true
      RETURNING *;
      `,
      []
    )
      .then((data) => {
        res.send(data.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //resets psql auto increment id counter
  router.delete('/counter', (req, res) => {
    db.query(
      `SELECT SETVAL((SELECT pg_get_serial_sequence('tables', 'id')), 1, false);`,
      []
    )
      .then((data) => {
        res.send(data.rows[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post('/', (req, res) => {
    const number_of_seats = req.body.number_of_seats;

    db.query(
      `INSERT INTO tables (employee_id, number_of_seats, x_pos, y_pos)
      VALUES (1, ${number_of_seats}, 0, 0);`,
      []
    )
      .then((data) => {
        res.send('New table added');
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
