const express = require("express");
const app = express();
require("dotenv").config();

// ——–––––—— CORS ——–––––—— //

const cors = require("cors");
const corsOptions = {
  origin: process.env.ENTRY_POINT,
};
app.use(cors(corsOptions));

// ———––––——–––––——––––———— //

const SightingsController = require("./controllers/sightingsController.js");
const sightingsController = new SightingsController();
const SightingsRouter = require("./routers/sightingsRouter.js");
const sightingsRouter = new SightingsRouter(sightingsController);

app.use("/sightings", sightingsRouter.routes());

// ——–––––—— PORT ——–––––—— //

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Express listening on PORT:${PORT}`);
});
