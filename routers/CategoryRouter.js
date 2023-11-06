class CategoryRouter {
  constructor(categoryController, express) {
    this.categoryController = categoryController;
    this.router = express.Router({ mergeParams: true });
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(
      "/",
      this.categoryController.getAll.bind(this.categoryController)
    );
    this.router.post(
      "/",
      this.categoryController.createOne.bind(this.categoryController)
    );
  }

  route() {
    return this.router;
  }
}

module.exports = CategoryRouter;
