const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();
const YEARLIST = [
  "before_1960",
  "1960-69",
  "1970-79",
  "1980-89",
  "1990-99",
  "2000-2009",
  "after_2010",
  
];

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

app.get("/sightings/year/:Year", async (req, res) => {
  const sightings = await getSightings();
  const year = req.params.Year;
  const selectedSightings = [];

  sightings.forEach((sighting) => {
    let yearNum = parseInt(sighting.YEAR);
    if (yearNum < 100 && yearNum!==NaN){
      yearNum +=1900;
    }
    switch (year) {
      case YEARLIST[0]:
        if (yearNum < 1960) {
          selectedSightings.push(sighting);
        }
        break;
      case YEARLIST[1]:
        if (yearNum >= 1960 && yearNum < 1970) {
          selectedSightings.push(sighting);
        }
        break;
      case YEARLIST[2]:
        if (yearNum >= 1970 && yearNum < 1980) {
          selectedSightings.push(sighting);
        }
        break;
      case YEARLIST[3]:
        if (yearNum >= 1980 && yearNum < 1990) {
          selectedSightings.push(sighting);
        }
        break;
      case YEARLIST[4]:
        if (yearNum >= 1990 && yearNum < 2000) {
          selectedSightings.push(sighting);
        }
        break;
      case YEARLIST[5]:
        if (yearNum >= 2000 && yearNum < 2010) {
          selectedSightings.push(sighting);
        }
        break;
      case YEARLIST[6]:
        if (yearNum >= 2010) {
          selectedSightings.push(sighting);
        }
        break;
      
      default:
        break;
    }
  });

  if (selectedSightings !== []) {
    res.json(selectedSightings);
  } else {
    res.status(404).json({ error: "No sightings in this period" });
  }
});

app.get("/sightings/list/allyear", async (req, res) => {
  const sightings = await getSightings();
  const yearList = [];
  sightings.forEach((sighting) => {
    yearList.push(sighting.YEAR);
  });
  const cleanData = yearList.filter(
    (item) => item !== null && item !== undefined
  );

  // Sort the array in ascending order
  cleanData.sort();

  // Remove duplicate elements from the array
  const uniqueList = [...new Set(cleanData)];
  if (yearList !== []) {
    res.json(uniqueList);
  } else {
    res
      .status(404)
      .json({ error: "Error in getting a list of sighting years" });
  }
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
