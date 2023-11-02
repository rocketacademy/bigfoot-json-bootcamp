/**IMPORTING REQUIRED PACKAGES */
const express = require("express");
const pg = require("pg"); // after npm i pg, write this to import pg.
var cors = require("cors");

// Set up Env in the root folder
require("dotenv").config();

/**
 * the pgConnectionConfigs tell the script which SQL database you are connecting to.
 * The details should be kept within an env.
 */
// Set up DB connection with pg Postgres, using a Pool connection (as opposed to a Client connection)
// const { Pool } = pg; // Capital in deconstructor, by convention indicates class.

// const pgConnectionConfigs = {
//   user: process.env.USERNAME,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   port: 5432, // Postgres server always runs on this port by default
// };
// const pool = new Pool(pgConnectionConfigs); // initialise a class

/** With Sequelize, Don't require Pool.
 * Postgres is automatically managed by Sequelize once you install both pg and Sequelize.
 * Config is done in the created config folder by Sequelize.
 */
// importing DB
const db = require("./db/models/index");
const { sighting } = db;

// Import Controllers
const SightingIndexController = require("./controllers/sightingIndexController");

// Import Routers
const SightingIndexRouter = require("./routers/sightingIndexRouter");

// Initialise Controllers First (will need to pass in controllers into respective routers)
const sightingIndexController = new SightingIndexController(sighting);

// Initialise Routers with respective Controllers
const sightingRouter = new SightingIndexRouter(
  sightingIndexController,
  express
);

const PORT = process.env.PORT;
const app = express();

const corsOptions = {
  origin: "localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors());
// app.use(cors(corsOptions)); // doesnt work..

/**
 *
 * Boilerplate to simulate getting database data
 */
// const { getSightings } = require("./utils.js");

// app.get("/", async (req, res) => {
//   /** RAW SQL METHOD */
//   const sqlQuery = "SELECT * FROM sightings;";

//   pool.query(sqlQuery, (err, results) => {
//     if (err) {
//       console.log("there has been an error!");
//       return res.json({ success: false, msg: err });
//     }
//     const data = results.rows;
//     return res.json({ success: true, data });
//   });

// });

/** Sequelize Method */
app.get("/", async (req, res) => {
  // Sequelize Model Query Methods
  const output = await this.model.findAll();
  return res.json({ success: true, data: output });
});

// FUNCTIONALITY

// Use initialised routers to handle requests.
app.use("/sightings", sightingRouter.routes()); // .routes is just the name of the function you give inside the router. convention to use routes.

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
