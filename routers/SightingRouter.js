class SightingRouter {
  constructor(sightingController, express) {
    this.controller = sightingController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();

    router.get("/:sightingIndex", this.controller.listSighting);
    router.get(
      "/filter/:year/:month/:season/sort/:sortYear/:sortState",
      this.controller.listSightingsWithFilterAndSort
    );

    return router;
  };
}

module.exports = SightingRouter;
