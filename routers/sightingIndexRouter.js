const express = require("express");
// const router = express.Router();

class sightingIndexRouter {
  constructor(sightingIndexController, express) {
    this.controller = sightingIndexController;
    this.express = express;
  }

  routes = () => {
    let router = this.express.Router();
    // router.get("/firstRoute", this.controller.test);
    // router.get("/base", this.controller.baseMethod);
    // router.get("/emAll/:name", this.controller.pokemon);

    router.get("/:sightingID", this.controller.getSighting);

    return router;
  };
}

module.exports = sightingIndexRouter;
