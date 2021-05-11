const router = require("express").Router();
const mockDb = require("../tests/mockDb_helper");
const testHelper = require("../tests/test_helper");

router.post("/reset", async (req, res) => {
	mockDb.clearDatabase();
	res.status(204).end();
});

router.get("/recipes", async (req, res) => {
	const recipesInDb = await testHelper.getRecipesInDb();
	res.status(200).json(recipesInDb);
});

router.get("/users", async (req, res) => {
	const usersInDb = await testHelper.getUsersInDb();
	res.status(200).json(usersInDb);
});

module.exports = router;