class commentsRouter {
  constructor(commentsController, express) {
    this.controller = commentsController;
    this.express = express;
  }

  routes = () => {
    let router = this.express.Router();

    router.post("/:sightingIndex/comments", this.controller.addComment);
    return router;
  };
}

module.exports = commentsRouter;
