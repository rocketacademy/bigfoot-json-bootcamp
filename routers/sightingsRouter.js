const express = require("express");
const router = express.Router();

class SightingsRouter {
  constructor(controller) {
    this.controller = controller;
  }

  routes = () => {
    router.get("/", this.controller.getLinks);
    router.get("/:id", this.controller.getData);
    return router;
  };
}

module.exports = SightingsRouter;
