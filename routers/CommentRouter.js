class CommentRouter {
  constructor(commentController, express) {
    this.commentController = commentController;
    this.router = express.Router({ mergeParams: true });
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get(
      "/",
      this.commentController.getAll.bind(this.commentController)
    );
    this.router.post(
      "/",
      this.commentController.createWithParentId.bind(this.commentController)
    );
  }

  route() {
    return this.router;
  }
}

module.exports = CommentRouter;
