const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
	const users = await User.find({}).populate("savedRecipes");
	res.json(users);
});

usersRouter.post("/", async (req, res) => {
	const body = req.body;

	if (body.password.length < 5) {
		return res.status(401).json({ error: "Password must be at least 5 characters" });
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(body.password, saltRounds);

	const user = new User({
		username: body.username,
		passwordHash
	});

	const savedUser = await user.save();
	res.json(savedUser);
});

module.exports = usersRouter;