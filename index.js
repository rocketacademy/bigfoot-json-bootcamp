import express from "express";
import cors from "cors";
import getSightings from "./utils.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get("/sightings/:sightingIndex", async (req, res) => {
  const sightings = await getSightings();
  const sightingIndex = req.params.sightingIndex;
  res.json(sightings[sightingIndex]);
});

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
