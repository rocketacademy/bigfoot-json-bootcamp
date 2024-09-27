const { Router } = require("express");
const sightingsController = require("../controllers/sightings");

const sightingsRouter = Router();

sightingsRouter.get("/", sightingsController.getAllSightings);
sightingsRouter.get("/:sightingIndex", sightingsController.getOneSighting);

module.exports = sightingsRouter;
