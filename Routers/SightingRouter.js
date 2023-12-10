class SightingsRouter {
  constructor(sightingsController, express) {
    this.controller = sightingsController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();
    router.get("/", this.controller.getAllData);
    router.get("/:sightingIndex", this.controller.getOneData);
    return router;
  };
}

module.exports = SightingsRouter;
