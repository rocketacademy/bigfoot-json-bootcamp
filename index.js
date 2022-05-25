import cors from "cors";
import express from "express";
import { getSightings } from "./utils.js";

const PORT = 3000;
const app = express();

// Enable CORS access to this server
app.use(cors());

app.get("/", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.get("/:sightingIndex", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings[req.params.sightingIndex]);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
