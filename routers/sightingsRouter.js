class sightingsRouter {
  constructor(sightingsController, express) {
    this.controller = sightingsController;
    this.express = express;
  }

  routes = () => {
    let router = this.express.Router();
    //get ALL sightings
    router.get("/allSightings", this.controller.baseGetAll);

    router.get(
      "/:sightingIndex/getAllComments",
      this.controller.getAllComments
    );
    router.get(
      "/:sightingIndex/getCategories",
      this.controller.getAssignedCategories
    );

    router.post("/addSighting", this.controller.createSighting);

    router.post("/:sightingIndex/addComments", this.controller.addComment);
    router.get("/:sightingIndex", this.controller.getSighting);

    // router.post("/newSighting", this.controller.createSighting);

    router.put(
      "/assignSightingCategory",
      this.controller.associateCategoryToSighting
    );
    router.put(
      "/removeAssignedCategory",
      this.controller.removeAssignedCategory
    );

    router.put("/:commentIndex/editComment", this.controller.editComment);
    router.delete(
      "/:commentIndex/deleteComment",
      this.controller.deleteComment
    );
    return router;
  };
}

module.exports = sightingsRouter;
