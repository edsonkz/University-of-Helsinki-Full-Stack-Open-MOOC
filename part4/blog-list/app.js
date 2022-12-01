const mongoose = require("mongoose");
const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");

const blogRouter = require("./controllers/blog");

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);

app.use(cors());
app.use(express.json());

app.use(blogRouter);

module.exports = app;