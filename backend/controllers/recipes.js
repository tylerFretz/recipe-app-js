/* eslint-disable no-undef */
const jwt = require("jsonwebtoken");
const recipesRouter = require("express").Router();
const Recipe = require("../models/recipe");
const User = require("../models/user");

recipesRouter.get("/", async (req, res) => {
	const recipes = await Recipe.find({}).populate("user", { username: 1, id: 1 });
	res.json(recipes);
});

recipesRouter.get("/:id", async (req, res) => {
	const recipe = await Recipe.findById(req.params.id);
	if (recipe) {
		res.json(recipe);
	}
	else {
		res.status(404).end();
	}
});

recipesRouter.delete("/:id", async (req, res) => {
	const { token } = req;

	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: "token missing or invalid" });
	}

	const recipe = await Recipe.findById(req.params.id);
	if (!recipe) return res.status(404).end();

	const belongsToUser = recipe.user.toString() === decodedToken.id;
	if (belongsToUser) {
		await recipe.remove();
		return res.status(204).end();
	}
	else {
		res.status(403).json({ error: "User is not permited to modify this resource" });
	}
});

recipesRouter.post("/", async (req, res) => {
	const { body } = req;
	const { token } = req;

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
		upvotes: body.upvotes || 0,
		summary: body.summary || "I guess the creator did not provide a summary ¯\\_(ツ)_/¯.",
		prepTime: body.prepTime,
		cookTime: body.cookTime,
		servings: body.servings,
	});

	const savedRecipe = await recipe.save();
	user.recipes = user.recipes.concat(savedRecipe._id);
	await user.save();
	await savedRecipe
		.populate("user", { username: 1, id: 1 })
		.execPopulate();
	res.status(201).json(savedRecipe);
});

recipesRouter.put("/:id", async (req, res) => {
	const { body, token } = req;
	const { upvotes } = body;

	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: "Token missing or invalid" });
	}

	const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, { upvotes }, { new: true, runValidators: true })
		.populate("user", { username: 1, id: 1 });
	res.status(201).json(updatedRecipe);
});

recipesRouter.put("/:id/comments", async (req, res) => {
	const { body, token } = req;
	const { comment } = body;

	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: "Token missing or invalid" });
	}

	if (typeof comment !== "string") {
		res.status(400).json({ error: "Comment is not a string" });
	}

	const requestRecipe = await Recipe.findByIdAndUpdate(
		req.params.id,
		{ $push: { comments: { body: comment, date: new Date() } } },
		{ new: true, runValidators: true })
		.populate("user", { username: 1, id: 1 });

	res.status(requestRecipe ? 200 : 404).json(requestRecipe);
});

module.exports = recipesRouter;