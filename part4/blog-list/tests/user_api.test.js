const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");

beforeEach(async () => {
	await User.deleteMany({});

	const userObjects = helper.initialUsers.map((user) => new User(user));
	const promiseArray = userObjects.map((user) => user.save());
	await Promise.all(promiseArray);
});

describe("creating user", () => {
	const newUser = {
		username: "root",
		name: "admin",
		password: "rrrrr",
	};
	test("a user can be added", async () => {
		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);
	});

	test("a user using a existing username", async () => {
		await api
			.post("/api/users")
			.send({ username: "admin", password: "admin", name: "admin" })
			.expect(400);
	});

	test("user with short username", async () => {
		const newUser = {
			username: "r",
			name: "admin",
			password: "rrrrr",
		};
		await api.post("/api/users").send(newUser).expect(400);
	});

	test("user with short password", async () => {
		const newUser = {
			username: "rrrrr",
			name: "admin",
			password: "r",
		};
		await api.post("/api/users").send(newUser).expect(400);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
