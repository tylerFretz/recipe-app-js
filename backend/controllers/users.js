const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

usersRouter.post("/", async (req, res) => {
	const { body } = req;

	if (body.password.length < 5) {
		return res.status(401).json({ error: "Password must be at least 5 characters" });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		email: body.email,
		passwordHash
	});

	const savedUser = await user.save();
	res.status(201).json(savedUser);
});

module.exports = usersRouter;