import express from "express";
import { getSightings } from "./utils.js";
import dotenv from "dotenv";
import User, { sequelize } from "./models/User.js";
// import Post from "./models/Post.js";
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
app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
