const express = require("express");
var cors = require("cors");
require("dotenv").config();

// Import Controllers
const SightingIndexController = require("./controllers/sightingIndexController");

// Import Routers
const SightingIndexRouter = require("./routers/sightingIndexRouter");

// Initialise Controllers First (will need to pass in controllers into respective routers)
const sightingIndexController = new SightingIndexController();

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

const { getSightings } = require("./utils.js");

app.get("/", async (req, res) => {
  console.log("backendtriggered");
  console.log(req.query);
  const sightings = await getSightings();
  // console.log(res);
  res.json(sightings);
});

// FUNCTIONALITY

// Use initialised routers to handle requests.
app.use("/sightings", sightingRouter.routes()); // .routes is just the name of the function you give inside the router. convention to use routes.

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
