// const express = require('express');
const { getSightings } = require('./utils.js');
require('dotenv').config();

const PORT = process.env.PORT;
// const app = express();

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/sightings', async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get('/sightings/:sightingIndex', async (req, res) => {
  console.log(req.params);
  const sightings = await getSightings();
  const sightingIndex = req.params.sightingIndex;
  res.json(sightings[+sightingIndex]);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
