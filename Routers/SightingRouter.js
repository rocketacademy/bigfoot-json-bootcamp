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
    router.get("/sort/:sort/:direction", this.controller.getSortData);
    return router;
  };
}

module.exports = SightingsRouter;
