/**IMPORTING REQUIRED PACKAGES */
const express = require("express");
const pg = require("pg"); // after npm i pg, write this to import pg.
var cors = require("cors");

// Set up Env in the root folder
require("dotenv").config();

/** With Sequelize, Don't require Pool.
 * Postgres is automatically managed by Sequelize once you install both pg and Sequelize.
 * Config is done in the created config folder by Sequelize.
 */
// importing DB
const db = require("./db/models/index");
const { sighting } = db;

// Import Controllers
const SightingIndexController = require("./controllers/sightingIndexController");
// const BaseController = require("./controllers/baseController");

// Import Routers
const SightingRouter = require("./routers/sightingRouter");

// Initialise Controllers First (will need to pass in controllers into respective routers)
// const baseController = new BaseController();
const sightingController = new SightingIndexController(sighting);

// Initialise Routers with respective Controllers
const sightingRouter = new SightingRouter(sightingController, express);

const PORT = process.env.PORT;
const app = express();

// const corsOptions = {
//   origin: "localhost:3000",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(cors(corsOptions)); // doesnt work..

/** Sequelize Method */
app.get("/", async (req, res) => {
  // Sequelize Model Query Methods
  try {
    console.log("in the default / path");
    const output = await sighting.findAll();
    return res.json({ success: true, data: output });
  } catch (err) {
    return res.status(400).json({ success: false, msg: err });
  }
});

// app.get("/", async (req, res) => {
//   // Sequelize Model Query Methods
// });

// Use initialised routers to handle requests.
app.use("/sightings", sightingRouter.routes()); // .routes is just the name of the function you give inside the router. convention to use routes.

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
