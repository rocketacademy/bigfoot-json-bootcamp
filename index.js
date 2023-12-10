const express = require("express");
const cors = require("cors");
const { getSightings } = require("./utils.js");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());

const SightingsController = require("./Controllers/SightingControllers.js");
const sightingsController = new SightingsController(getSightings);

const SightingsRouter = require("./Routers/SightingRouter");
const sightingsRouter = new SightingsRouter(sightingsController, express);

app.use("/sightings", sightingsRouter.route());

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
