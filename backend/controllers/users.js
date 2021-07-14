/* eslint-disable indent */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const usersRouter = require('express').Router();
const User = require('../models/user');
const Recipe = require('../models/recipe');
const ObjectId = require('mongoose').Types.ObjectId;

usersRouter.get('/', async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
	const user = await User.findById(req.params.id)
		.populate({
			path: 'savedRecipes',
			populate: { path: 'user', select: 'username' }
		})
		.populate({
			path: 'submittedRecipes',
			populate: { path: 'user', select: 'username' }
		})
		.exec();
	if (user) {
		res.json(user);
	}
	else {
		res.status(404).end();
	}
});

usersRouter.post('/',
	body('username').not().isEmpty().isLength({ min: 3, max: 50 }).trim().escape().withMessage('Username must be between 5 and 50 characters'),
	body('email').not().isEmpty().isEmail().withMessage('Improper email format'),
	body('password').isStrongPassword().withMessage('Password specifications: Min length: 8, Min lowercase: 1, Min uppercase: 1, minNumbers: 1, minSymbols: 1'),
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { body } = req;
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

usersRouter.put('/:id',
	body('username').not().isEmpty().isLength({ min: 5, max: 50 }).trim().escape().withMessage('Username must be between 5 and 50 characters'),
	body('email').not().isEmpty().isEmail().withMessage('Improper email format'),
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, username } = req.body;
		const { token } = req;
		// a user must be logged in
		const decodedToken = jwt.verify(token, process.env.SECRET);
		if (!token || !decodedToken.id) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}

		const updatedUser = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });

		res.status(updatedUser ? 200 : 400).json(updatedUser);
	});


// Adds or removes a recipe from a user's saved recipes based on if it is already saved
usersRouter.post('/:id/savedRecipes', async (req, res) => {
	const { body, token } = req;
	const { recipeId } = body;

	// a user must be logged in to save recipes
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'Must be logged in' });
	}

	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).json({ error: 'Error finding user.' });

	if (user.savedRecipes.includes(recipeId)) {
		user.savedRecipes = user.savedRecipes.filter(id => id.toString() !== recipeId);
		await user.save();
		res.status(200).send({ result: 'removed' });
	}
	else {
		user.savedRecipes = user.savedRecipes.concat(recipeId);
		await user.save();
		res.status(200).send({ result: 'saved' });
	}
});

// deletes user and all recipes they submitted
usersRouter.delete('/:id', async (req, res) => {
	const { token } = req;

	// a user must be logged in
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' });
	}

	const user = await User.findById(req.params.id);
	if (!user) return res.status(404).end();

	await user.remove();
	await Recipe.deleteMany({ user: new ObjectId(req.params.id) });
	return res.status(204).end();
});

module.exports = usersRouter;