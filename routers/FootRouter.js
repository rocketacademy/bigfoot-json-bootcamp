class FootRouter {
  constructor(footController, express) {
    this.controller = footController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();

    router.get("/getAll", this.controller.getAll);
    router.get("/:id", this.controller.findById);

    return router;
  };
}

module.exports = FootRouter;
