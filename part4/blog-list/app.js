const mongoose = require("mongoose");
const config = require("./utils/config");
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");

const tokenExtractor = require("./middlewares/tokenExtractor");

const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());
app.use(tokenExtractor.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

if (process.env.NODE_ENV === "test") {
	const testingRouter = require("./controllers/test");
	app.use("/api/testing", testingRouter);
}

module.exports = app;
