const cors = require("cors");
const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

//import CORS
app.use(cors());

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

//the name in the URL eg. ":sightIndex" must be the same in the params.
app.get("/sightings/:sightingIndex", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings[req.params.sightingIndex]);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
