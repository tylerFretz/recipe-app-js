const router = require("express").Router();
const Recipe = require("../models/recipe");
const User = require("../models/user");

router.post("/reset", async (req, res) => {
	await Recipe.deleteMany({});
	await User.deleteMany({});

	res.status(204).end();
});

module.exports = router;