const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cors = require('cors');

require('dotenv').config();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { Pool } = require('pg');
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});
db.connect();

const PORT = process.env.PORT || 8080;

//import routes
const loginRoutes = require('./src/routes/login');
const employeeRoutes = require('./src/routes/employees');
const menuRoutes = require('./src/routes/menu');
const orderRoutes = require('./src/routes/orders');
const tableRoutes = require('./src/routes/tables');
app.use(cors());
//use routes
app.use('/login', loginRoutes(db));
app.use('/api/employees', employeeRoutes(db));
app.use('/api/menu', menuRoutes(db));
app.use('/api/orders', orderRoutes(db));
app.use('/api/tables', tableRoutes(db));

app.get('/', (req, res) => {
  console.log(req.session);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
