class categoriesRouter {
  constructor(categoriesController, express) {
    this.controller = categoriesController;
    this.express = express;
  }

  routes = () => {
    let router = this.express.Router();

    router.get("/getAll", this.controller.baseGetAll);
    router.post("/add", this.controller.addCategory);
    router.put("/edit", this.controller.editCategory);

    return router;
  };
}

module.exports = categoriesRouter;
