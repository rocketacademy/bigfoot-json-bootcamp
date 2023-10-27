const express = require("express");
const cors = require("cors");
const pg = require("pg");
// .env setup
require("dotenv").config();

// set up DB connection
const { Pool } = pg;
const pgConnectionConfigs = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};
const pool = new Pool(pgConnectionConfigs);

const app = express();

const PORT = process.env.PORT;

// import controllers
const FootController = require("./controllers/FootController.js");
const footController = new FootController({ tblName: "students", pool });
const SightingController = require("./controllers/SightingController.js");
const sightingController = new SightingController();

// import routers
const FootRouter = require("./routers/FootRouter.js");
const footRouter = new FootRouter(footController, express);
const SightingRouter = require("./routers/SightingRouter.js");
const sightingRouter = new SightingRouter(sightingController, express);

// Setting up middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routing requests

app.use("/foot", footRouter.route());
app.use("/sightings", sightingRouter.route());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
