const express = require("express");
var cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT;
const app = express();

const SightingController = require("./controllers/SightingController");
const sightingController = new SightingController();
const SightingRouter = require("./routers/SightingRouter");
const sightingRouter = new SightingRouter(sightingController, express);

// Setting up middleware
app.use(cors());
app.use("/sightings", sightingRouter.route());
app.use("/", (req, res) => {
  res.send("Incorrect Path");
});

app.listen(PORT);
