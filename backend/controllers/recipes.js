/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const recipesRouter = require("express").Router();
const Recipe = require("../models/recipe");
const User = require("../models/user");

// get all recipes but exclude their comments field
recipesRouter.get("/", async (req, res) => {
	const recipes = await Recipe.find({}, "-comments -upvotedUsers").populate("user", { username: 1, id: 1 });
	res.json(recipes);
});

// get specific recipe based on it's id
recipesRouter.get("/:id", async (req, res) => {
	const recipe = await Recipe.findById(req.params.id).populate("user", { username: 1, id: 1 });
	if (recipe) {
		res.json(recipe);
	}
	else {
		res.status(404).end();
	}
});

// delete recipe based on it's id
recipesRouter.delete("/:id", async (req, res) => {
	const { token } = req;

	// a user must be logged in to delete a recipe
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: "token missing or invalid" });
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
		res.status(403).json({ error: "User is not permited to modify this resource" });
	}
});

// create new recipe
recipesRouter.post("/",
	body("name").not().isEmpty().isLength({ max: 100 }).trim().escape().withMessage("Name must not have more than 100 characters."),
	body("instructions").not().isEmpty().isLength({ max: 10000 }).trim().escape().withMessage("Instructions too long"),
	body("ingredients").isArray({ min: 1 }).withMessage("Need at least 1 ingredient"),
	body("category").optional().isString().trim().escape().withMessage("Category must be a string"),
	body("area").optional().isString().trim().escape().withMessage("Area must be a string"),
	body("thumbImageUrl").optional().isURL().trim().escape().withMessage("Thumb image must be provided as a url"),
	body("youtubeUrl").optional().isURL().trim().escape().withMessage("Youtube url must be provided as a url"),
	tags("tags.*").optional().isString().trim().escape().withMessage("Tags must be strings"),
	body("sourceUrl").optional().trim().escape().isURL("Source url must be a url"),
	body("prepTime").optional().isInt().withMessage("Prep time must be an integer"),
	body("cookTime").optional().isInt().withMessage("Cook time must be an integer"),
	body("servings").optional().isInt().withMessage("Servings must be an integer"),
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
			return res.status(401).json({ error: "token missing or invalid" });
		}

		const user = await User.findById(decodedToken.id);

		const recipe = new Recipe({
			name: body.name,
			category: body.category || "Miscellaneous",
			area: body.area,
			instructions: body.instructions,
			ingredients: body.ingredients,
			thumbImageUrl: body.thumbImageUrl,
			youtubeUrl: body.youtubeUrl,
			tags: body.tags,
			sourceUrl: body.sourceUrl,
			user: user._id,
			summary: body.summary || "I guess the creator did not provide a summary ¯\\_(ツ)_/¯.",
			prepTime: body.prepTime,
			cookTime: body.cookTime,
			servings: body.servings,
		});

		const savedRecipe = await recipe.save();
		user.submittedRecipes = user.submittedRecipes.concat(savedRecipe._id);
		await user.save();
		await savedRecipe
			.populate("user", { username: 1, id: 1 })
			.execPopulate();
		res.status(201).json(savedRecipe);
	});

// Update amount of upvotes a recipe has
// a user can only change the amount of upvotes by +/- 1
recipesRouter.put("/:id", async (req, res) => {
	const { token } = req;

	// a user must be logged in to vote
	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: "Token missing or invalid" });
	}

	const recipe = await Recipe.findById(req.params.id);
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
recipesRouter.post("/:id/comments",
	body("comment").not().isEmpty().isLength({ max: 20000 }).trim().escape().withMessage("Comment max length is 20000"),
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
			return res.status(401).json({ error: "Token missing or invalid" });
		}

		const requestRecipe = await Recipe.findByIdAndUpdate(
			req.params.id,
			{ $push: { comments: { commentText: comment, user: decodedToken.id, dateAdded: new Date() } } },
			{ new: true, runValidators: true })
			.populate("user", { username: 1, id: 1 });

		res.status(requestRecipe ? 200 : 404).json(requestRecipe);
	});

module.exports = recipesRouter;