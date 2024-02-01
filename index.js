const express = require("express");
const { getSightings } = require("./utils.js");
const { getSighting } = require("./utils.js");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();

app.use(cors({ origin: "http://localhost:3001" }));

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get("/sightings/:index", async (req, res) => {
  const index = req.params.index;
  const sighting = await getSighting(index);
  res.json(sighting);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
