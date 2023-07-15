const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const sightings = await getSightings();
  const sightingIndex = req.params.sightingIndex;

  if (sightingIndex >= 0 && sightingIndex < sightings.length) {
    const selectedSighting = sightings[sightingIndex];
    res.json(selectedSighting);
  } else {
    res.status(404).json({ error: "Sighting not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
