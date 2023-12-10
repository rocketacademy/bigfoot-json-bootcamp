class SightingsRouter {
  constructor(sightingsController, express) {
    this.controller = sightingsController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();
    router.get("/sightings", this.controller.getAllData);
    return router;
  };
}

module.exports = SightingsRouter;
