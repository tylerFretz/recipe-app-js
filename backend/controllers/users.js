/* eslint-disable indent */
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

usersRouter.get("/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		res.json(user);
	}
	else {
		res.status(404).end();
	}
});

usersRouter.post("/",
	body("username").not().isEmpty().isLength({ min: 3, max: 50 }).trim().escape().withMessage("Username must be between 3 and 50 characters"),
	body("email").not().isEmpty().isEmail().withMessage("Improper Email format"),
	body("password").not().isStrongPassword().withMessage("Password specifications: Min length: 8, Min lowercase: 1, Min uppercase: 1, minNumbers: 1, minSymbols: 1"),
async (req, res) => {
	const { body } = req;

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
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