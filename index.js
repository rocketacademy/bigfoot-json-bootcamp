const express = require("express");
const app = express();
const { getSightings } = require("./utils.js");

// .env setup
require("dotenv").config();
const PORT = process.env.PORT;

// import controllers
const FootController = require("./controllers/FootController.js");
const footController = new FootController();

// import routers
const FootRouter = require("./routers/FootRouter.js");
const footRouter = new FootRouter(footController, express);

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/foot", footRouter.route());
app.use("/", (req, res) => {
  res.send("Incorrect path");
});

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
