const express = require("express");
const { initializeMiddleware } = require("./middleware");
const { PORT } = require("./configs");
const sightingsRouter = require("./routers/sightings");

const app = express();

initializeMiddleware(app);

app.use("/sightings", sightingsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
