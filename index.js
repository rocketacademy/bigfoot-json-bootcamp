const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();
app.use(cors());

app.get("/sightings", async (req, res) => {
  let sightings = await getSightings();

  const { year } = req.query;

  if (year) {
    sightings = sightings.filter(
      (item) => item.YEAR && item.YEAR.includes(year)
    );
  }
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const { sightingIndex } = req.params;

  const sightings = await getSightings();

  res.json(sightings[sightingIndex]);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
