const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    return response.status(400).json({ error: "Username must be unique." });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "Username and password must be at least 3 characters long.",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

userRouter.get("/:id", async (request, response) => {
  const { id } = request.params;
  const objId = mongoose.Types.ObjectId(id);
  console.log(objId);
  const users = await User.findOne({ _id: id }).populate("blogs", {
    user: 0,
    likes: 0,
  });

  response.status(200).json(users);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { user: 0, likes: 0 });

  response.status(200).json(users);
});

module.exports = userRouter;
