const mongoose = require("mongoose");
const supertest = require("supertest");
const mockDb = require("./mockDb_helper");
const helper = require("./test_helper");
const app = require("../app");
const Recipe = require("../models/recipe");
const User = require("../models/user");

const api = supertest(app);

jest.setTimeout(60000);
let userLoginResponse = null;

beforeEach(async () => {
	await mockDb.clearDatabase();

	for (let user of helper.initialUsers) {
		let userObject = new User(user);
		await userObject.save();
	}

	const savedUsers = await helper.getUsersInDb();
	const validUserId = savedUsers[0].id;

	for (let recipe of helper.initialRecipes) {
		let recipeObject = new Recipe({ ...recipe, user: validUserId });
		await recipeObject.save();
	}
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

describe("Creating a recipe: POST /api/recipes", () => {
	beforeEach(async () => {
		const response = await api
			.post("/api/login")
			.send({ username: "username", email: "username@mail.com", password: "password" });

		userLoginResponse = response.body;
	});

	test("Fails with status 401 if unauthenticated", async () => {
		await api
			.post("/api/recipes")
			.send(helper.validRecipe)
			.expect(401);
	});

	test("Fails with status 400 if recipe is invalid", async () => {
		await api
			.post("/api/recipes")
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
			.send(helper.recipeWithMissingName)
			.expect(400);

		await api
			.post("/api/recipes")
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
			.send(helper.recipeWithMissingInstructions)
			.expect(400);

		await api
			.post("/api/recipes")
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
			.send(helper.recipeWithMissingIngredients)
			.expect(400);
	});

	test("Succeeds if valid", async () => {
		const response = await api
			.post("/api/recipes")
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.send(helper.validRecipe)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const recipesAtEnd = await helper.getRecipesInDb();
		expect(recipesAtEnd.length).toBe(helper.initialRecipes.length + 1);
		const recipeIds = recipesAtEnd.map((recipe) => recipe.id);
		expect(recipeIds).toContain(response.body.id);
	});

	test("and the saved recipe referencing the user who added it", async () => {
		const response = await api
			.post("/api/recipes")
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.send(helper.validRecipe)
			.expect(201);

		expect(response.body.user.id).toBe(userLoginResponse.user.id);
	});

	test("Default summary is created if not included", async () => {
		const response = await api
			.post("/api/recipes")
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
			.send(helper.recipeWithMissingSummary);

		expect(response.body.summary).toBe("I guess the creator did not provide a summary ¯\\_(ツ)_/¯.");
	});

	test("Upvotes are set to 0 if missing", async () => {
		const response = await api
			.post("/api/recipes")
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
			.send(helper.recipeWithMissingUpvotes);

		expect(response.body.upvotes).toBe(0);
	});

	test("Comments are undefined by default", async () => {
		const response = await api
			.post("/api/recipes")
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
			.send(helper.validRecipe);

		expect(response.body.comments).toBeUndefined();
	});
});

describe("Deleting a specific recipe: DELETE /api/recipes/:id", () => {
	beforeEach(async () => {
		const response = await api
			.post("/api/login")
			.send({ username: "username", email: "username@mail.com", password: "password" });

		userLoginResponse = response.body;
	});

	test("Fails with status 401 if anauthenticated", async () => {
		const recipesAtStart = await helper.getRecipesInDb();
		const recipeToDelete = recipesAtStart[0];

		await api.delete(`/api/recipes/${recipeToDelete.id}`).expect(401);
	});

	test("Fails with status 400 if id is invalid", async () => {
		const invalidId = "IamInvalid";
		await api
			.delete(`/api/recipes/${invalidId}`)
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.expect(400);
	});

	test("Fails with status 404 if recipe doesn't exist", async () => {
		const deletedValidId = await helper.getDeletedValidRecipeId();
		await api
			.delete(`/api/recipes/${deletedValidId}`)
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.expect(404);
	});

	test("Fails with status 403 if the recipe doesn't ref the auth user", async () => {
		const recipesAtStart = await helper.getRecipesInDb();
		const recipeToDelete = recipesAtStart[0];

		await api
			.delete(`/api/recipes/${recipeToDelete.id}`)
			.set("Authorization", "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJpZ0RpY2tSaWNrIiwiZW1haWwiOiJmcmV0enR5bGVyQGdtYWlsLmNvbSIsImlkIjoiNjA3NjNkMDFhYWEwNmY0OTc4MWM4ZDZjIiwiaWF0IjoxNjIwNzYyNTQwLCJleHAiOjE2MjA3NjYxNDB9.RE_2b0RX3N5K97Kvif23hdaGRmuQvrl5UKmldkRdXWw")
			.expect(403);
	});

	test("Deletes the recipe with that id if valid", async () => {
		const recipesAtStart = await helper.getRecipesInDb();
		const recipeToDelete = recipesAtStart[0];

		await api
			.delete(`/api/recipes/${recipeToDelete.id}`)
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.expect(204);

		const recipesAtEnd = await helper.getRecipesInDb();
		const recipeIds = recipesAtEnd.map(recipe => recipe.id);
		expect(recipeIds).not.toContain(recipeToDelete.id);
	});
});


afterAll(async () => {
	await mockDb.closeDatabase();
	await new Promise((resolve) => setTimeout(() => resolve(), 0)); // avoid jest open handle error
});
