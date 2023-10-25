const express = require("express");
const cors = require("cors");

const app = express();

// .env setup
require("dotenv").config();
const PORT = process.env.PORT;

// import controllers
const FootController = require("./controllers/FootController.js");
const footController = new FootController();
const SightingController = require("./controllers/SightingController.js");
const sightingController = new SightingController();

// import routers
const FootRouter = require("./routers/FootRouter.js");
const footRouter = new FootRouter(footController, express);
const SightingRouter = require("./routers/SightingRouter.js");
const sightingRouter = new SightingRouter(sightingController, express);

// Setting up middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routing requests

app.use("/foot", footRouter.route());
app.use("/sightings", sightingRouter.route());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
