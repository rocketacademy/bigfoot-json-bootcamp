class sightingRouter {
  constructor(sightingController, express) {
    this.controller = sightingController;
    this.express = express;
  }

  routes = () => {
    let router = this.express.Router();

    router.get("/:sightingID", this.controller.getSighting);
    // router.get("/hello", this.controller.test);

    router.post("/newUser", this.controller.createOne);
    // router.put("/", this.controller.edit);
    // router.delete("/", this.controller.delete);
    return router;
  };
}

module.exports = sightingRouter;
