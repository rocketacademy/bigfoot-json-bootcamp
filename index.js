const express = require("express");
var cors = require("cors");
const { getSightings } = require("./utils.js");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();
// Setting up middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings[req.params.sightingIndex]);
});

app.get(
  "/sightings/filter/:year/:month/:season/sort/:sortYear/:sortState",
  async (req, res) => {
    const sightings = await getSightings();
    const season = req.params.season;
    const year = req.params.year;
    const month = req.params.month;
    const sortYear = req.params.sortYear;
    const sortState = req.params.sortState;

    let results = sightings;

    // Clean Data
    results = results.filter((sighting) =>
      Number.isInteger(Number(sighting.YEAR))
    );
    results = results.filter((sighting) => sighting.MONTH);

    // Filter data according to user input
    if (year !== "0") {
      results = results.filter((sighting) => sighting.YEAR === year);
    }

    if (month !== "0") {
      results = results.filter((sighting) => sighting.MONTH === month);
    }

    if (season !== "0") {
      results = results.filter((sighting) => sighting.SEASON === season);
    }

    // Sort data according to user input
    // by year
    if (sortYear !== "0") {
      results.sort(function (a, b) {
        return a.YEAR - b.YEAR;
      });
    }

    // by state
    if (sortState !== "0") {
      results.sort(function (a, b) {
        var x = a.STATE.toLowerCase();
        var y = b.STATE.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
    }

    res.json(results);
  }
);

// app.get("/sightings/filter?", async (req, res) => {
//   const params = req.query.year;
//   res.send(params);
// });

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
