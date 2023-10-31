const express = require("express");
const cors = require("cors");
const pg = require("pg");
// .env setup
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

// importing DB
const db = require("./db/models/index");
const { sighting } = db;

// import controllers
const SightingController = require("./controllers/SightingController.js");
const sightingController = new SightingController(sighting);

// import routers

const SightingRouter = require("./routers/SightingRouter.js");
const sightingRouter = new SightingRouter(sightingController, express);

// Setting up middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routing requests

app.use("/sightings", sightingRouter.route());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
