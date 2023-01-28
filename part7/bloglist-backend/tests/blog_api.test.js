const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash("admin", saltRounds);
	const user = new User({
		username: "admin",
		name: "admin",
		passwordHash,
	});
	await user.save();
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
	const adminUser = {
		username: "admin",
		password: "admin",
	};
	test("a blog can be added", async () => {
		const newBlog = {
			title: "My Eggs",
			author: "Eggman",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 200,
		};

		const data = await api.post("/api/login").send(adminUser);

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set("authorization", `bearer ${data.body.token}`)
			.expect(201)
			.expect("Content-Type", /application\/json/);
	});

	test("a blog cannot be added without token", async () => {
		const newBlog = {
			title: "My Eggs",
			author: "Eggman",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 200,
		};

		await api.post("/api/blogs").send(newBlog).expect(401);
	});

	test("blog without likes", async () => {
		const newBlog = {
			title: "My Eggs2",
			author: "Eggman2",
			url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		};

		const data = await api.post("/api/login").send(adminUser);

		await api
			.post("/api/blogs")
			.send(newBlog)
			.set("authorization", `bearer ${data.body.token}`)
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

		const data = await api.post("/api/login").send(adminUser);

		await api
			.post("/api/blogs")
			.set("authorization", `bearer ${data.body.token}`)
			.send(newBlogNoURL)
			.expect(400);
		await api
			.post("/api/blogs")
			.set("authorization", `bearer ${data.body.token}`)
			.send(newBlogNoTITLE)
			.expect(400);
	});
});

describe("deletion of a blog", () => {
	const adminUser = {
		username: "admin",
		password: "admin",
	};
	const newBlog = {
		title: "My Eggs",
		author: "Eggman",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 200,
	};

	test("succeeds with status code 204 if id is valid", async () => {
		const data = await api.post("/api/login").send(adminUser);
		const blogToDelete = await api
			.post("/api/blogs")
			.set("authorization", `bearer ${data.body.token}`)
			.send(newBlog);

		await api
			.delete(`/api/blogs/${blogToDelete.body.id}`)
			.set("authorization", `bearer ${data.body.token}`)
			.expect(204);

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
