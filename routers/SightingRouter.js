class SightingRouter {
  constructor(sightingController, express) {
    this.sightingController = sightingController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(
      "/",
      this.sightingController.getAllSightings.bind(this.sightingController)
    );
    this.router.get(
      "/:sightingIndex",
      this.sightingController.getSightingByIndex.bind(this.sightingController)
    );
  }

  route() {
    return this.router;
  }
}

module.exports = SightingRouter;
