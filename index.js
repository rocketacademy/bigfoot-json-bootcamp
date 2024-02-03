// Require Express NPM library
const express = require("express");
// Enable CORS
const cors = require("cors");
// Sightings data from sightings.json
const { getSightings } = require("./utils.js");
// .env
require("dotenv").config();
// Declare the port to listen to and initialise Express
const PORT = process.env.PORT;
const app = express();

// Enable CORS for all routes
app.use(cors());

// GET request
app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

// New route
app.get("/sightings/:sightingIndex", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings[req.params.sightingIndex]);
});

// Start the server
// localhost:3000/sightings
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
