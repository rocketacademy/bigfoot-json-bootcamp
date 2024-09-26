const express = require("express");
const cors = require("cors");
const { getSightings } = require("./utils.js");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

// IMPORTANT! MISSED OUT ON THIS!!!
app.use(cors());

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const foundIndex = req.params.sightingIndex;
  const sightings = await getSightings();
  res.json(sightings[foundIndex]);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
