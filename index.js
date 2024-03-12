import express from "express";
import { getSightings } from "./utils.js";
import dotenv from "dotenv";
import User, { sequelize } from "./models/User.js";
dotenv.config();
const app = express();
app.use(express.json());
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
const PORT = process.env.PORT || 5000;
app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.status(200).json(sightings);
});

app.post("/sightings", async (req, res) => {
  const newSighting = req.body; 
  try {
    const updatedSightings = await getSightings(newSighting);
    res.status(201).json(updatedSightings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
