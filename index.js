const express = require("express");
const cors = require("cors");
const { getSightings } = require("./utils.js");
require("dotenv").config();

//Saving data into in-memory variable so that I can POST, PUT and DELETE
let sightings = [];
async function loadData() {
  try {
    sightings = await getSightings();
  } catch (error) {
    console.error("Error reading file:", error);
  }
}
loadData();

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/sightings", (req, res) => {
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", (req, res) => {
  const sightingIndex = parseInt(req.params.sightingIndex, 10);

  if (sightingIndex >= 0 && sightingIndex < sightings.length) {
    res.json(sightings[sightingIndex]);
  } else {
    res.status(404).send("Sighting not found");
  }
});

app.get("/last-sighting", (req, res) => {
  res.json(sightings[sightings.length - 1]);
});

app.post("/sightings", (req, res) => {
  const postData = req.body;
  sightings.push(postData);
  res.send("Sent!");
});

app.put("/sightings/:sightingIndex", (req, res) => {
  let editedData = req.body;
  let targetToUpdate = req.params.sightingIndex;
  sightings.splice(targetToUpdate, 1, editedData);
  res.send(sightings[targetToUpdate]);
});

app.delete("/sightings/:sightingIndex", (req, res) => {
  let targetToUpdate = req.params.sightingIndex;
  sightings.splice(targetToUpdate, 1);
  res.send("Deleted!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
