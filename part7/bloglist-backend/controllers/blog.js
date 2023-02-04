const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");
const middleware = require("../middlewares/userExtractor");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  console.log(id);
  const blog = await Blog.findOne({ _id: id });

  response.status(200).json(blog);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;
  const user = request.user;

  if (user === null) {
    return response.status(401).send({ error: "User not authorized." });
  }

  const blog = new Blog({ title, author, url, likes, user: user._id });
  if (!blog.url || !blog.title) {
    return response.status(400).send({ error: "Url and title are required" });
  }
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    if (user === null) {
      return response.status(403).send({ error: "User not authorized." });
    }

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user._id.toString()) {
      await blog.remove();
      return response.status(204).json({ message: "Blog deleted." });
    }
    response
      .status(404)
      .send({ error: "Only the creator of the blog can delete it." });
  }
);

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(200).send(updatedBlog);
});

//Comments Section//
blogRouter.get("/:id/comments", async (request, response) => {
  const { id } = request.params;

  const comments = await Comment.find({ blog: id });
  response.status(200).send(comments);
});

blogRouter.post("/:id/comments", async (request, response) => {
  const { id } = request.params;
  const { content } = request.body;

  const comment = new Comment({ content, blog: id });

  const savedComment = await comment.save();
  response.status(200).send(savedComment);
});

module.exports = blogRouter;
