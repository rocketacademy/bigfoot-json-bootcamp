class SightingsRouter {
  constructor(sightingsController, express) {
    this.controller = sightingsController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();
    router.get("/", this.controller.getAllData);
    router.get("/:sightingIndex", this.controller.getOneData);
    router.get("/:filter/:filterData", this.controller.getFilterData);
    return router;
  };
}

module.exports = SightingsRouter;
