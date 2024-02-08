const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  console.log(req.query);
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const { sightingIndex } = req.params;
  console.log(sightingIndex);
  const sightings = await getSightings();

  res.json(sightings[sightingIndex]);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
