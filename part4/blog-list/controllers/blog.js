const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
	const blog = new Blog(request.body);
	if (!blog.url || !blog.title) {
		return response
			.status(400)
			.send({ error: "Url and title are required" });
	}
	const savedBlog = await blog.save();
	response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

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

module.exports = blogRouter;
