const express = require("express");
const { getSightings } = require("./utils.js");
require("dotenv").config();
var cors = require("cors");

const PORT = process.env.PORT;
const app = express();

app.use(cors("*"));

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const sightings = await getSightings(); 
  res.json(sightings[req.params.sightingIndex])
})

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
