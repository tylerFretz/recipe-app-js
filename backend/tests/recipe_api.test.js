const mongoose = require("mongoose");
const supertest = require("supertest");
const jwt = require("jsonwebtoken");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Recipe = require("../models/recipe");
const User = require("../models/user");

jest.setTimeout(60000);
const globals = {};

beforeEach(async () => {
	await User.deleteMany({});
	await Recipe.deleteMany({});

	const userObjects = helper.initialUsers.map(user => new User(user));
	const userPromises = userObjects.map(user => user.save());
	await Promise.all(userPromises);

	const savedUsers = await helper.getUsersInDb();
	expect(savedUsers.length).toBeGreaterThan(1);

	const userForAllRecipes = {
		username: savedUsers[0].username,
		email: savedUsers[0].email,
		id: savedUsers[0].id,
	};

	const userForNoRecipes = {
		username: savedUsers[1].username,
		email: savedUsers[1].email,
		id: savedUsers[1].id,
	};

	const token = jwt.sign(userForAllRecipes, process.env.SECRET);
	const unauthorizedToken = jwt.sign(userForNoRecipes, process.env.SECRET);

	globals.token = `Bearer ${token}`;
	globals.tokenId = userForAllRecipes.id;
	globals.unauthorizedToken = `Bearer ${unauthorizedToken}`;

	const validUserId = savedUsers[0].id;

	const recipeObjects = helper.initialRecipes.map(recipe => new Recipe({ ...recipe, user: validUserId }));
	const recipePromises = recipeObjects.map(recipe => recipe.save());
	await Promise.all(recipePromises);
});


describe("Fetching existing recipes collection: GET /api/recipes", () => {
	test("Recipes are returned as json", async () => {
		await api
			.get("/api/recipes")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("Returns all recipes on the server", async () => {
		const response = await api.get("/api/recipes");
		expect(response.body.length).toBe(helper.initialRecipes.length);
	});

	test("Returns recipes that each have an 'id' prop", async () => {
		const response = await api.get("/api/recipes");
		expect(response.body[0].id).toBeDefined();
	});

	test("Returns recipes with user prop as ref ids to who added them", async () => {
		const response = await api.get("/api/recipes");
		expect(response.body[0].user).toBeDefined();
		let isValidId;
		if (typeof response.body[0].user === "object") {
			isValidId = mongoose.Types.ObjectId.isValid(response.body[0].user.id);
		} else {
			isValidId = mongoose.Types.ObjectId.isValid(response.body[0].user);
		}
		expect(isValidId).toBe(true);
	});
});

describe("Fetching individual recipes: GET /api/recipes/:id", () => {
	test("Fails with status 400 if the id is invalid", async () => {
		const invalidId = "iaminvalid";
		await api.get(`/api/recipes/${invalidId}`).expect(400);
	});

	test("Fails with status 404 if recipe does not exist", async () => {
		const validNonExistingId = mongoose.Types.ObjectId();
		await api.get(`/api/recipes/${validNonExistingId}`).expect(404);
	});

	test("Succeeds if the recipe with that id exists", async () => {
		const recipesInDb = await helper.getRecipesInDb();
		const recipeToView = recipesInDb[0];

		//perform similar JSON serialization and parsing as the server so that dateAdded prop is formatted correctly
		const processedRecipeToView = JSON.parse(JSON.stringify(recipeToView));

		const resultRecipe = await api
			.get(`/api/recipes/${recipeToView.id}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(resultRecipe.body).toEqual(processedRecipeToView);
	});
});


afterAll(() => {
	mongoose.connection.close();
});
