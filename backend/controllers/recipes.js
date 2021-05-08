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

recipesRouter.post("/dev", async (req, res) => {
	const { body } = req;

	const recipe = new Recipe({
		name: body.name,
		category: body.category || "",
		area: body.area || "",
		instructions: body.instructions,
		ingredients: body.ingredients,
		thumbImageUrl: body.thumbImageUrl || "",
		youtubeUrl: body.youtubeUrl || "",
		tags: body.tags || [""],
		sourceUrl: body.sourceUrl || "",
		user: null,
		upvotes: body.upvotes || 0,
		summary: body.summary || "",
		prepTime: body.prepTime || 0,
		cookTime: body.cookTime || 0,
		servings: body.servings || 0
	});

	const savedRecipe = await recipe.save();
	res.json(savedRecipe);
});

recipesRouter.post("/", async (req, res) => {
	const { body } = req;
	const { token } = req;

	const decodedToken = jwt.verify(token, process.env.SECRET);
	if (!token || !decodedToken.id) {
		return res.status(401).json({ error: "token missing or invalid " });
	}

	const user = await User.findById(decodedToken.id);

	const recipe = new Recipe({
		name: body.name,
		category: body.category || "",
		area: body.area || "",
		instructions: body.instructions,
		ingredients: body.ingredients,
		thumbImageUrl: body.thumbImageUrl || "",
		youtubeUrl: body.youtubeUrl || "",
		tags: body.tags || [""],
		sourceUrl: body.sourceUrl || "",
		user: user._id,
		upvotes: body.upvotes || 0,
		summary: body.summary || "",
		prepTime: body.prepTime || 0,
		cookTime: body.cookTime || 0,
		servings: body.servings || 0
	});

	const savedRecipe = await recipe.save();
	user.recipes = user.recipes.concat(savedRecipe._id);
	await user.save();

	res.json(savedRecipe);
});

// Update existing recipe
// Only allows the amount of upvotes to be updated
recipesRouter.put("/:id", async (req, res) => {
	const { upvotes } = req.body;

	const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, { upvotes }, { new: true, runValidators: true })
		.populate("user", { username: 1, id: 1 });
	res.status(201).json(updatedRecipe);
});

// Add comment to existing recipe
// Comments are anonymous
recipesRouter.put("/:id/comments", async (req, res) => {
	if (!req.body.comment) {
		res.status(400).json({ error: "comment missing" });
	}

	const requestRecipe = await Recipe.findByIdAndUpdate(
		req.params.id,
		{ $push: { comments: { body: req.body.comment, date: new Date() } } },
		{ new: true, runValidators: true })
		.populate("user", { username: 1, id: 1 });

	res.status(requestRecipe ? 200 : 404).json(requestRecipe);
});

module.exports = recipesRouter;