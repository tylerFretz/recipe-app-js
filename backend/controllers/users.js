/* eslint-disable indent */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const usersRouter = require('express').Router();
const User = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;

usersRouter.get('/', async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
	const user = await User.findById(req.params.id)
		.populate('savedRecipes', { name: 1, id: 1, dateAdded: 1, upvoteCount: 1, thumbImageUrl: 1 })
		.populate('submittedRecipes', { name: 1, id: 1, dateAdded: 1, upvoteCount: 1, thumbImageUrl: 1 })
		.exec();
	if (user) {
		res.json(user);
	}
	else {
		res.status(404).end();
	}
});

usersRouter.post('/',
	body('username').not().isEmpty().isLength({ min: 3, max: 50 }).trim().escape().withMessage('Username must be between 3 and 50 characters'),
	body('email').not().isEmpty().isEmail().withMessage('Improper Email format'),
	body('password').isStrongPassword().withMessage('Password specifications: Min length: 8, Min lowercase: 1, Min uppercase: 1, minNumbers: 1, minSymbols: 1'),
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

usersRouter.post('/:id/favourites', async (req, res) => {
	const { body, token } = req;
	const { recipeId } = body;

	// a user must be logged in to vote
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'Must be logged in' });
	}

	const updatedUser = await User.findByIdAndUpdate(
		req.params.id,
		{ $push: { savedRecipes: new ObjectId(recipeId) } },
		{ new: true, runValidators: true })
		.populate('savedRecipes', { name: 1, id: 1, dateAdded: 1, upvoteCount: 1 });

	res.status(updatedUser ? 200 : 400).json(updatedUser);
});

module.exports = usersRouter;