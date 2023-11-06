const express = require("express");
const cors = require("cors");
const pg = require("pg");
// .env setup
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

// importing DB
const db = require("./db/models/index");
const { sighting, comment, category } = db;

// import controllers
const SightingController = require("./controllers/SightingController.js");
const sightingController = new SightingController(sighting);

const CommentController = require("./controllers/CommentController.js");
const commentController = new CommentController(comment);

const CategoryController = require("./controllers/CategoryController.js");
const categoryController = new CategoryController(category);

// import routers

const SightingRouter = require("./routers/SightingRouter.js");
const sightingRouter = new SightingRouter(sightingController, express);

const CommentRouter = require("./routers/CommentRouter.js");
const commentRouter = new CommentRouter(commentController, express);

const CategoryRouter = require("./routers/CategoryRouter.js");
const categoryRouter = new CategoryRouter(categoryController, express);

// Setting up middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routing requests
app.use("/sightings", sightingRouter.route());
app.use("/sightings/:id/comments", commentRouter.route());
app.use("/categories", categoryRouter.route());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
