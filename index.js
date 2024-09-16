const express = require("express");
const cors = require("cors");
const { getSightings } = require("./utils.js");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  let index = req.params.sightingIndex;
  const sightings = await getSightings();
  res.json(sightings[index]);
});

app.get("/sightings", async (req, res) => {
  let year = req.query.year;
  const sightings = await getSightings();
  const filteredSightings = sightings.filter((element) => element.YEAR == year);
  res.json(filteredSightings);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
