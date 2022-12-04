const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
});

describe("response format", () => {
	test("returns the correct amount of blog posts in the JSON format", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/)
			.then((response) => {
				expect(response.body).toHaveLength(helper.initialBlogs.length);
			});
	});

	test("blog has id property", async () => {
		await api.get("/api/blogs").then((response) => {
			expect(response.body[0].id).toBeDefined();
		});
	});
});

describe("creating blog", () => {
	test("a blog can be added", async () => {
		const newBlog = {
			title: "My Eggs",
			author: "Eggman",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 200,
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)
			.then((response) => {
				const { id, ...blog } = response.body;
				expect(blog).toEqual(newBlog);
			});
	});

	test("blog without likes", async () => {
		const newBlog = {
			title: "My Eggs2",
			author: "Eggman2",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)
			.then((response) => {
				expect(response.body.likes).toEqual(0);
			});
	});

	test("blog without url or title returns bad request", async () => {
		const newBlogNoURL = {
			title: "My Eggs",
			author: "Eggman",
		};

		const newBlogNoTITLE = {
			author: "Eggman",
			url: "www.google.com",
		};

		await api.post("/api/blogs").send(newBlogNoURL).expect(400);
		await api.post("/api/blogs").send(newBlogNoTITLE).expect(400);
	});
});

describe("deletion of a blog", () => {
	test("succeeds with status code 204 if id is valid", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogsInDb();
		const titles = blogsAtEnd.map((r) => r.title);
		expect(titles).not.toContain(blogToDelete.title);
	});
});

describe("update of a blog", () => {
	test("succeeds with status code 200 if id is valid", async () => {
		const blogsAtStart = await helper.blogsInDb();
		const blogToUpdate = blogsAtStart[0];

		const updatedBlog = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send({ likes: 200 });

		const blogs = await helper.blogsInDb();
		expect(blogs[0].likes).toEqual(200);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
