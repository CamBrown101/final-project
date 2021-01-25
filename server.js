const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { Client } = require("pg");
const db = new Client({
  connectionString: process.env.DATABASE_URL,
});
db.connect();

const PORT = process.env.PORT || 8080;

//import routes
const loginRoutes = require("./src/routes/login");
const employeeRoutes = require("./src/routes/employees");
const menuRoutes = require("./src/routes/menu");
const orderRoutes = require("./src/routes/orders");
const tableRoutes = require("./src/routes/tables");
const categoryRoutes = require("./src/routes/categories");
const timecardRoutes = require("./src/routes/timecards");
const analyticRoutes = require("./src/routes/analytics");
const paymentRoutes = require("./src/routes/payments");

app.use(cors());
if (process.env.NODE_ENV === "production"{
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "index.html"));
  });
}

//use routes
app.use("/login", loginRoutes(db));
app.use("/api/employees", employeeRoutes(db));
app.use("/api/menu", menuRoutes(db));
app.use("/api/orders", orderRoutes(db));
app.use("/api/tables", tableRoutes(db));
app.use("/api/categories", categoryRoutes(db));
app.use("/api/timecards", timecardRoutes(db));
app.use("/api/analytics", analyticRoutes(db));
app.use("/api/payments", paymentRoutes(db));

app.get("/", (req, res) => {
  console.log(req.session);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
