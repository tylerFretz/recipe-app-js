const mongoose = require("mongoose");
const supertest = require("supertest");
const mockDb = require("./mockDb_helper");
const helper = require("./test_helper");
const app = require("../app");
const Recipe = require("../models/recipe");
const User = require("../models/user");

const api = supertest(app);
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

describe ("Fetching exisiting recipes collection with query parameters: GET /api/recipes?[queryOpts]", () => {
	test("Returns a recipe by name", async () => {
		const usersInDb = await helper.getUsersInDb();
		const recipesInDb = await helper.getRecipesInDb();
		const sugarPieRecipe = recipesInDb[0];
		const recipeName = sugarPieRecipe.name.replace(" ", "%20");

		const recipeToView = { ...sugarPieRecipe, user: { id: sugarPieRecipe.user, username: usersInDb[0].username } };
		const processedRecipeToView = JSON.parse(JSON.stringify(recipeToView));

		const response = await api.get(`/api/recipes?name=${recipeName}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(response.body[0]).toEqual(processedRecipeToView);
	});

	test("Returns a recipe by category", async () => {
		const usersInDb = await helper.getUsersInDb();
		const recipesInDb = await helper.getRecipesInDb();
		const salmonRecipe = recipesInDb[1];

		const recipeToView = { ...salmonRecipe, user: { id: salmonRecipe.user, username: usersInDb[0].username } };
		const processedRecipeToView = JSON.parse(JSON.stringify(recipeToView));

		const response = await api.get(`/api/recipes?category=${salmonRecipe.category}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(response.body[0]).toEqual(processedRecipeToView);
	});

	test("Returns a recipe by area", async () => {
		const usersInDb = await helper.getUsersInDb();
		const recipesInDb = await helper.getRecipesInDb();
		const salmonRecipe = recipesInDb[1];

		const recipeToView = { ...salmonRecipe, user: { id: salmonRecipe.user, username: usersInDb[0].username } };
		const processedRecipeToView = JSON.parse(JSON.stringify(recipeToView));

		const response = await api.get(`/api/recipes?area=${salmonRecipe.area}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(response.body[0]).toEqual(processedRecipeToView);
	});

	test("Returns a recipe by userId", async () => {
		const usersInDb = await helper.getUsersInDb();

		const response = await api.get(`/api/recipes?user=${usersInDb[0].id}`)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		expect(response.body.length).toBe(helper.initialRecipes.length);
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
		const usersInDb = await helper.getUsersInDb();
		// issue with test. Api returns a user object with id and username properties instead of just the user id string.
		const recipeToView = { ...recipesInDb[0], user: { id: recipesInDb[0].user, username: usersInDb[0].username } };

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
			.set("Content-Type", "application/json")
			.send(helper.validRecipe)
			.expect(201);

		const recipesAtEnd = await helper.getRecipesInDb();
		expect(recipesAtEnd.length).toBe(helper.initialRecipes.length + 1);
		const recipeIds = recipesAtEnd.map((recipe) => recipe.id);
		expect(recipeIds).toContain(response.body.id);
	});

	test("and the saved recipe referencing the user who added it", async () => {
		const response = await api
			.post("/api/recipes")
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
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
			.send(helper.validRecipe);

		expect(response.body.upvoteCount).toBe(0);
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

		const loginResponse = await api
			.post("/api/login")
			.send({ username: "username2", email: "username2@mail.com", password: "password2" });

		const { token } = loginResponse.body;

		await api
			.delete(`/api/recipes/${recipeToDelete.id}`)
			.set("Authorization", `bearer ${token}`)
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


	test("Deleting a recipe removes it from a user's submittedRecipes feild", async () => {
		const validSubmission = await api
			.post("/api/recipes")
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
			.send(helper.validRecipe);

		const userBefore = await api
			.get(`/api/users/${userLoginResponse.user.id}`);


		expect(userBefore.body.submittedRecipes).toContain(validSubmission.body.id);

		await api
			.delete(`/api/recipes/${validSubmission.body.id}`)
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.expect(204);

		const userAfter = await api
			.get(`/api/users/${userLoginResponse.user.id}`);

		expect(userAfter.body.submittedRecipes).not.toContain(validSubmission.body.id);
	});
});

describe("Updating a recipe's upvotes: PUT /api/recipes/:id", () => {
	beforeEach(async () => {
		const response = await api
			.post("/api/login")
			.send({ username: "username", email: "username@mail.com", password: "password" });

		userLoginResponse = response.body;
	});

	test("Fails with status 401 if unauthenticated", async () => {
		const recipesAtStart = await helper.getRecipesInDb();
		const recipeToUpdate = recipesAtStart[0];

		await api.put(`/api/recipes/${recipeToUpdate.id}`).expect(401);
	});

	test("Fails with status 400 if the id is invalid", async () => {
		const invalidId = "IamInvalid";
		await api
			.put(`/api/recipes/${invalidId}`)
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.expect(400);
	});

	test("Receives status 404 if the recipe doesn't exist", async () => {
		const deletedValidId = await helper.getDeletedValidRecipeId();

		await api
			.put(`/api/recipes/${deletedValidId}`)
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.expect(404);
	});

	test("Successfully increments / decrements upvoteCount with valid request", async () => {
		let recipes = await helper.getRecipesInDb();
		const recipeId = recipes[0].id;

		// upvoting
		await api
			.put(`/api/recipes/${recipeId}`)
			.set("Authorization", `bearer ${userLoginResponse.token}`);

		recipes= await helper.getRecipesInDb();
		expect(recipes[0].upvoteCount).toBe(1);
		expect(JSON.stringify(recipes[0].upvotedUsers)).toContain(userLoginResponse.user.id);

		// downvoting
		await api
			.put(`/api/recipes/${recipeId}`)
			.set("Authorization", `bearer ${userLoginResponse.token}`);

		recipes = await helper.getRecipesInDb();
		expect(recipes[0].upvoteCount).toBe(0);
		expect(JSON.stringify(recipes[0].upvotedUsers)).not.toContain(userLoginResponse.user.id);

	});
});

describe("Adding comments to a recipe: POST /api/recipes/:id/comments", () => {
	beforeEach(async () => {
		const response = await api
			.post("/api/login")
			.send({ username: "username", email: "username@mail.com", password: "password" });

		userLoginResponse = response.body;
	});

	test("Fails with status 401 if unauthenticated", async () => {
		const recipesAtStart = await helper.getRecipesInDb();
		const recipeToUpdate = recipesAtStart[0];

		await api
			.post(`/api/recipes/${recipeToUpdate.id}/comments`)
			.set("Content-Type", "application/json")
			.send({ comment: "I am a comment" })
			.expect(401);
	});

	test("Fails with status 400 if the id is invalid", async () => {
		const invalidId = "IamInvalid";
		await api
			.post(`/api/recipes/${invalidId}/comments`)
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
			.send({ comment: "I am a comment" })
			.expect(400);
	});

	test("Receives status 404 if the recipe doesn't exist", async () => {
		const deletedValidId = await helper.getDeletedValidRecipeId();

		await api
			.post(`/api/recipes/${deletedValidId}/comments`)
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
			.send({ comment: "I am a comment" })
			.expect(404);
	});

	test("Succeeds if valid", async () => {
		const recipesAtStart = await helper.getRecipesInDb();
		const recipeToCommentOn = recipesAtStart[0];

		await api
			.post(`/api/recipes/${recipeToCommentOn.id}/comments`)
			.set("Authorization", `bearer ${userLoginResponse.token}`)
			.set("Content-Type", "application/json")
			.send({ comment: "I am a comment" })
			.expect(200);

		const recipesAtEnd = await helper.getRecipesInDb();
		const commentedRecipe = recipesAtEnd[0];
		expect(commentedRecipe.comments.length).toBe(1);
		expect(commentedRecipe.comments[0].commentText).toBe("I am a comment");
		expect(commentedRecipe.comments[0].user.toString()).toEqual(userLoginResponse.user.id);
	});
});


afterAll(async () => {
	await mockDb.closeDatabase();
	await new Promise((resolve) => setTimeout(() => resolve(), 0)); // avoid jest open handle error
});
