import express from "express";
import { getSightings } from "./utils.js";
import dotenv from "dotenv";
import User, { sequelize } from "./models/User.js";
import Post from "./models/Post.js";
dotenv.config();
const app = express();
app.use(express.json());
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
const PORT = process.env.PORT || 5000;
app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/sightings", async (req, res) => {
  const sightings = await getSightings();
  res.status(200).json(sightings);
});

app.post("/sightings", async (req, res) => {
  const newSighting = req.body; // Assuming the request body contains the new sighting
  try {
    const updatedSightings = await getSightings(newSighting);
    res.status(201).json(updatedSightings);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// posts
app.get("/posts", async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const { title, desc } = req.body;
  try {
    const newPost = await Post.create({
      id: Math.round(Math.random() * 99999999),
      title,
      desc,
      likes: 0,
      comment: [], 
    });

    res.json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete("/posts/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await post.destroy();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
  }
});
app.post("/posts/:id/comment", async (req, res) => {
  const postId = req.params.id;
  const { comment } = req.body;
  console.log(comment, postId);

  try {
    const post = await Post.findByPk(postId);

    console.log(post);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    // Assuming 'comment' is an array field in your Post model
    post?.comment?.push(comment);

    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Like a post
app.put("/posts/:id/like", async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    post.likes += 1;
    await post.save();
    res.json({ message: "Post liked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
