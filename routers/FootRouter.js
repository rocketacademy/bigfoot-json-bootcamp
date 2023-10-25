class FootRouter {
  constructor(footController, express) {
    this.controller = footController;
    this.express = express;
  }

  route = () => {
    let router = this.express.Router();

    router.get("/", this.controller.list);

    return router;
  };
}

module.exports = FootRouter;
