class sightingsRouter {
  constructor(sightingsController, express) {
    this.controller = sightingsController;
    this.express = express;
  }

  routes = () => {
    let router = this.express.Router();
    //get ALL sightings
    router.get("/allSightings", this.controller.baseGetAll);

    router.post("/:sightingIndex/comments", this.controller.addComment);
    router.get("/:sightingIndex", this.controller.getSighting);

    // router.post("/newSighting", this.controller.createSighting);

    router.put(
      "/sightingCategory",
      this.controller.associateCategoryToSighting
    );
    router.put("/:commentIndex/comments", this.controller.editComment);
    router.delete("/:commentIndex/comments", this.controller.deleteComment);
    return router;
  };
}

module.exports = sightingsRouter;
