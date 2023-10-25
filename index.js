const express = require("express");
const cors = require("cors");

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
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/foot", footRouter.route());

app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.json(sightings);
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
