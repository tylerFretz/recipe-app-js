/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const { body, param, validationResult } = require('express-validator');
const Filter = require('bad-words');
const ObjectId = require('mongoose').Types.ObjectId;
const recipesRouter = require('express').Router();
const Recipe = require('../models/recipe');
const User = require('../models/user');

/*
* 	@Summary - get all recipes in their db based on query. Defaults to returning all recipes but excludes thier comments and upvotedUsers list
* 	@Params (all optional)
*	- sortBy [upvoteCount, dateAdded]
*	- order [desc, asc]
*   - limit [any positive integer]
*	- category [any string]
*	- area [any string]
*	- user [userId]
*   - tag [any string]
*   - name [any string]
*   - random ["true"]
*	@Return - list of recipes in JSON that match query params.
*/
recipesRouter.get('/',
	param('sortBy').trim().escape().isIn(['upvoteCount', 'dateAdded']).optional(),
	param('order').trim().escape().isIn(['desc', 'asc']).optional(),
	param('limit').isInt({ min: 1 }).optional(),
	param('category').trim().escape().isString().optional(),
	param('area').trim().escape().isString().optional(),
	param('user').trim().escape().isString().optional(),
	param('tag').trim().escape().isString().optional(),
	param('name').trim().escape().isString().optional(),
	param('random').trim().escape().equals('true').optional(),
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { query } = req;

		if (query.random) {
			const recipes = await Recipe.aggregate([{ $sample: { size: 6 } },
			{ $lookup: { from: 'users', localField: 'user', foreignField: '_id', as: 'user' } },
			{ $unwind: { path: '$user' } },
			{ $addFields: { id: '$_id' } },
			{ $unset: ['_id', 'user.submittedRecipes', 'user._id', 'user.savedRecipes', 'user.passwordHash', 'user.email', 'user.__v'] }
			]);
			return res.json(recipes);
		}

		let conditions = {};

		if (query.name) conditions.name = { $regex: '.*' + query.name + '.*', $options: 'i' };
		if (query.tag) conditions.tags = query.tag;
		if (query.user) conditions.user = new ObjectId(query.user);
		if (query.area) conditions.area = query.area;
		if (query.category) conditions.category = query.category;

		let dbQuery = Recipe.find(conditions);

		if (query.sortBy && query.sortBy === 'upvoteCount') {
			if (query.order && query.order === 'asc') {
				dbQuery.sort('upvoteCount');
			} else {
				dbQuery.sort('-upvoteCount');
			}
		} else if (query.sortBy && query.sortBy === 'dateAdded') {
			if (query.order && query.order === 'asc') {
				dbQuery.sort('dateAdded');
			} else {
				dbQuery.sort('-dateAdded');
			}
		}

		if (query.limit) dbQuery.limit(Number(query.limit));

		const recipes = await dbQuery.populate('user', { username: 1, id: 1 }).exec();
		res.json(recipes);
	});

recipesRouter.get('/data', async (req, res) => {
	const categories = await Recipe.distinct('category');
	const tags = await Recipe.distinct('tags');
	const areas = await Recipe.distinct('area');
	res.json({ categories, tags, areas });
});

// get specific recipe based on it's id
recipesRouter.get('/:id', async (req, res) => {
	const recipe = await Recipe.findById(req.params.id)
		.populate('user', { username: 1, id: 1 })
		.populate({
			path: 'comments',
			populate: {
				path: 'user',
				select: { 'username': 1, 'avatarImageUrl': 1 }
			}
		});
	if (recipe) {
		res.json(recipe);
	}
	else {
		res.status(404).end();
	}
});

// delete recipe based on it's id
recipesRouter.delete('/:id', async (req, res) => {
	const { token } = req;

	// a user must be logged in to delete a recipe
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' });
	}

	const recipe = await Recipe.findById(req.params.id);
	if (!recipe) return res.status(404).end();

	const belongsToUser = recipe.user.toString() === decodedToken.id;
	if (belongsToUser) {
		await recipe.remove();
		await User.findByIdAndUpdate(decodedToken.id, { $pull: { submittedRecipes: req.params.id } });
		return res.status(204).end();
	}
	else {
		res.status(403).json({ error: 'User is not permited to modify this resource' });
	}
});

// create new recipe
recipesRouter.post('/',
	body('name').not().isEmpty().isLength({ max: 100 }).trim().escape().withMessage('Name must not have more than 100 characters.'),
	body('instructions').not().isEmpty().isLength({ max: 10000 }).trim().escape().withMessage('Instructions too long'),
	body('ingredients').isArray({ min: 1 }).withMessage('Need at least 1 ingredient'),
	body('summary').optional().isString().isLength({ max: 500 }).trim().escape().withMessage('Summary must not have more than 500 characters.'),
	body('category').optional().isString().trim().escape().withMessage('Category must be a string'),
	body('area').optional().isString().trim().escape().withMessage('Area must be a string'),
	body('thumbImageUrl').optional().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).withMessage('Thumb image must be provided as a url'),
	body('youtubeUrl').optional().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).withMessage('Youtube url must be provided as a url'),
	body('tags.*').optional().isString().trim().escape().withMessage('Tags must be strings'),
	body('sourceUrl').optional().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).withMessage('Source url must be a valid url'),
	body('prepTime').optional().isInt().withMessage('Prep time must be an integer'),
	body('cookTime').optional().isInt().withMessage('Cook time must be an integer'),
	body('servings').optional().isInt().withMessage('Servings must be an integer'),
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { body } = req;
		const { token } = req;
		// a user must be logged in to add a new recipe
		const decodedToken = jwt.verify(token, process.env.SECRET);
		if (!token || !decodedToken.id) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}

		const user = await User.findById(decodedToken.id);

		const filter = new Filter();
		for (const property in body) {
			if (filter.isProfane(body[property])) return res.status(400).json({ error: `${property} contains profanity` });
		}

		const recipe = new Recipe({
			name: body.name,
			category: body.category || 'Miscellaneous',
			area: body.area,
			instructions: body.instructions,
			ingredients: body.ingredients,
			thumbImageUrl: body.thumbImageUrl,
			youtubeUrl: body.youtubeUrl,
			tags: body.tags,
			sourceUrl: body.sourceUrl,
			user: new ObjectId(user._id),
			summary: body.summary || 'Sint Lorem dolore sunt elit esse nostrud aliqua voluptate incididunt ipsum aliquip cillum Lorem ad. Eiusmod veniam eu nulla voluptate duis pariatur esse minim. Dolore dolore officia velit quis elit laborum minim non et et voluptate exercitation irure.',
			prepTime: body.prepTime,
			cookTime: body.cookTime,
			servings: body.servings,
		});

		const savedRecipe = await recipe.save();
		user.submittedRecipes = user.submittedRecipes.concat(savedRecipe._id);
		await user.save();
		await savedRecipe
			.populate('user', { username: 1, id: 1 })
			.execPopulate();
		res.status(201).json(savedRecipe);
	});

// update recipe content
recipesRouter.put('/:id',
	body('name').not().isEmpty().isLength({ max: 100 }).trim().escape().withMessage('Name must not have more than 100 characters.'),
	body('instructions').not().isEmpty().isLength({ max: 10000 }).trim().escape().withMessage('Instructions too long'),
	body('ingredients').isArray({ min: 1 }).withMessage('Need at least 1 ingredient'),
	body('summary').optional().isString().isLength({ max: 500 }).trim().escape().withMessage('Summary must not have more than 500 characters.'),
	body('category').optional().isString().trim().escape().withMessage('Category must be a string'),
	body('area').optional().isString().trim().escape().withMessage('Area must be a string'),
	body('thumbImageUrl').optional().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).withMessage('Thumb image must be provided as a url'),
	body('youtubeUrl').optional().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).withMessage('Youtube url must be provided as a url'),
	body('tags.*').optional().isString().trim().escape().withMessage('Tags must be strings'),
	body('sourceUrl').optional().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/).withMessage('Source url must be a valid url'),
	body('prepTime').optional().isInt().withMessage('Prep time must be an integer'),
	body('cookTime').optional().isInt().withMessage('Cook time must be an integer'),
	body('servings').optional().isInt().withMessage('Servings must be an integer'),
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { body } = req;
		const { token } = req;
		// a user must be logged in
		const decodedToken = jwt.verify(token, process.env.SECRET);
		if (!token || !decodedToken.id) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}

		const filter = new Filter();
		for (const property in body) {
			if (filter.isProfane(body[property])) return res.status(400).json({ error: `${property} contains profanity` });
		}

		const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, body, { new: true })
			.populate('user', { username: 1, id: 1 });
		res.status(201).json(updatedRecipe);
	});

// Update amount of upvotes a recipe has
// a user can only change the amount of upvotes by +/- 1
recipesRouter.post('/:id/upvotes', async (req, res) => {
	const { token } = req;

	// a user must be logged in to vote
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: 'Must be logged in.' });
	}

	const recipe = await Recipe.findById(req.params.id).populate('user', { username: 1, id: 1 });
	if (!recipe) return res.status(404).end();

	if (recipe.upvotedUsers.includes(decodedToken.id)) {
		recipe.upvoteCount -= 1;
		recipe.upvotedUsers = recipe.upvotedUsers.filter(userId => userId.toString() !== decodedToken.id);
		const updatedRecipe = await recipe.save();
		res.status(200).send(updatedRecipe);
	}
	else {
		recipe.upvoteCount += 1;
		recipe.upvotedUsers = recipe.upvotedUsers.concat(decodedToken.id);
		const updatedRecipe = await recipe.save();
		res.status(200).send(updatedRecipe);
	}
});

// Add a comment to a specific recipe based on it's id
recipesRouter.post('/:id/comments',
	body('comment').not().isEmpty().isLength({ max: 10000 }).trim().escape().withMessage('Comment max length is 10000'),
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { body, token } = req;
		const { comment } = body;

		// user must be logged in to comment
		const decodedToken = jwt.verify(token, process.env.SECRET);
		if (!token || !decodedToken.id) {
			return res.status(401).json({ error: 'Token missing or invalid' });
		}

		const filter = new Filter();
		if (filter.isProfane(comment)) return res.status(400).json({ error: 'Comment contains profanity' });

		const updatedRecipe = await Recipe.findByIdAndUpdate(
			req.params.id,
			{ $push: { comments: { commentText: comment, user: new ObjectId(decodedToken.id), dateAdded: new Date() } } },
			{ new: true, runValidators: true })
			.populate('user', { username: 1, id: 1 })
			.populate({
				path: 'comments',
				populate: {
					path: 'user',
					select: { 'username': 1, 'avatarImageUrl': 1 }
				}
			});

		res.status(updatedRecipe ? 200 : 404).json(updatedRecipe);
	});

module.exports = recipesRouter;