const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get("/sightings", async (req, res) => {
  const state = req.query.state;
  const year = req.query.year;

  let sightings = await getSightings();
  if (state) {
    sightings = sightings.filter(
      (sighting) =>
        sighting.STATE &&
        sighting.STATE.toLowerCase().includes(state.toLowerCase())
    );
  }

  if (year) {
    sightings = sightings.filter(
      (sighting) => sighting.YEAR && sighting.YEAR.includes(year)
    );
  }

  res.json(sightings);
});

app.get("/sightings/:REPORT_NUMBER", async (req, res) => {
  const sightings = await getSightings();
  const reportNumber = req.params.REPORT_NUMBER;
  const sighting = sightings.find(
    (sighting) => sighting.REPORT_NUMBER === reportNumber
  );

  res.json(sighting);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
