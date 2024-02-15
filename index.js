const cors = require("cors");
const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const sightings = await getSightings();
  let index = req.params.sightingIndex;
  res.json(sightings[index]);
});

//filter by year
app.get("/sightings/search/:sightingYear", async (req, res) => {
  const sightings = await getSightings();
  let year = req.params.sightingYear;
  const sightingsForYear = sightings.filter(
    (sighting) => sighting.YEAR === year
  );
  res.json(sightingsForYear);
});

//sort by state after filtering by year
app.get("/sightings/search/sort/:sightingYear", async (req, res) => {
  const sightings = await getSightings();
  let year = req.params.sightingYear;
  const sightingsForYear = sightings.filter(
    (sighting) => sighting.YEAR === year
  );

  ///sort by county
  sightingsForYear.sort((a, b) => {
    if (a.COUNTY < b.COUNTY) {
      return -1;
    }
    if (a.COUNTY > b.COUNTY) {
      return 1;
    }
    return 0;
  });

  res.json(sightingsForYear);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
