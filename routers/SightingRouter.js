class SightingRouter {
  constructor(sightingController, express) {
    this.sightingController = sightingController;
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(
      "/",
      this.sightingController.getAll.bind(this.sightingController)
    );
    this.router.get(
      "/:id",
      this.sightingController.getById.bind(this.sightingController)
    );
    this.router.post(
      "/",
      this.sightingController.createOne.bind(this.sightingController)
    );
  }

  route() {
    return this.router;
  }
}

module.exports = SightingRouter;
