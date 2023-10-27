class FootRouter {
  constructor(footController, express) {
    this.controller = footController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();

    router.get("/getAll", this.controller.getAll);

    return router;
  };
}

module.exports = FootRouter;
