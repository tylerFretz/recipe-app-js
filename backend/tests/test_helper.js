const bcrypt = require("bcrypt");
const Recipe = require("../models/recipe");
const User = require("../models/user");


const initialRecipes = [
	{
		"name": "Sugar Pie",
		"category": "Dessert",
		"area": "Canadian",
		"instructions": "Preheat oven to 350 degrees F (175 degrees C). Grease a 9-inch pie dish.\r\nPlace the brown sugar and butter in a mixing bowl, and beat them together with an electric mixer until creamy and very well combined, without lumps. Beat in eggs, one at a time, incorporating the first egg before adding the next one. Add the vanilla extract and salt; beat the flour in, a little at a time, and then the milk, making a creamy batter. Pour the batter into the prepared pie dish.\r\nBake in the preheated oven for 35 minutes; remove pie, and cover the rim with aluminum foil to prevent burning. Return to oven, and bake until the middle sets and the top forms a crusty layer, about 15 more minutes. Let the pie cool to room temperature, then refrigerate for at least 1 hour before serving.",
		"ingredients": [{ "name": "Brown Sugar", "measure": "2 cups" }, { "name": "Butter", "measure": "1/4 cup" }, { "name": "Eggs", "measure": "2" }, { "name": "Vanilla Extract", "measure": "1 tsp" }, { "name": "Salt", "measure": "1 tsp" }, { "name": "Plain Flour", "measure": "1/2 cup" }, { "name": "Milk", "measure": "1 1/2 cups" }],
		"thumbImageUrl": "https://www.themealdb.com/images/media/meals/yrstur1511816601.jpg",
		"tags": ["Pie", "Desert"],
		"sourceUrl": "http://allrecipes.com/recipe/213595/miraculous-canadian-sugar-pie/",
		"summary": "Ipsum in sunt proident tempor ad ipsum non elit ad laborum occaecat commodo. Amet reprehenderit amet laboris reprehenderit tempor dolor occaecat duis nostrud proident ea. Ex officia tempor dolor veniam magna deserunt elit reprehenderit deserunt.",
		"prepTime": 10,
		"cookTime": 30,
		"servings": 8
	},
	{
		"name": "Honey Teriyaki Salmon",
		"category": "Seafood",
		"area": "Japanese",
		"instructions": "Mix all the ingredients in the Honey Teriyaki Glaze together. Whisk to blend well. Combine the salmon and the Glaze together.\r\n\r\nHeat up a skillet on medium-low heat. Add the oil, Pan-fry the salmon on both sides until it’s completely cooked inside and the glaze thickens.\r\n\r\nGarnish with sesame and serve immediately.",
		"ingredients": [{ "name": "Salmon", "measure": "1 lb" }, { "name": "Olive Oil", "measure": "1 tablespoon" }, { "name": "Soy Sauce", "measure": "2 tablespoons" }, { "name": "Sake", "measure": "2 tablespoons" }, { "name": "Sesame Seed", "measure": "4 tablespoons" }],
		"thumbImageUrl": "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
		"youtubeUrl": "https://www.youtube.com/watch?v=4MpYuaJsvRw",
		"tags": ["Fish", "DateNight"],
		"summary": "Non do anim nostrud labore. Deserunt aliquip consequat minim dolor nisi aute amet fugiat do consequat minim Lorem in mollit. Aliqua aliqua officia nisi pariatur pariatur est duis ullamco sint laborum velit deserunt officia dolore. Elit magna cillum est sit culpa veniam Lorem laborum nisi deserunt id incididunt consectetur. Reprehenderit pariatur ea culpa mollit culpa quis officia proident quis magna aliquip veniam pariatur in.",
		"prepTime": 15,
		"cookTime": 35,
		"servings": 2
	},
	{
		"name": "Fettucine alfredo",
		"category": "Pasta",
		"area": "Italian",
		"instructions": "In a medium saucepan, stir the clotted cream, butter and cornflour over a low-ish heat and bring to a low simmer. Turn off the heat and keep warm.\r\nMeanwhile, put the cheese and nutmeg in a small bowl and add a good grinding of black pepper, then stir everything together (don’t add any salt at this stage).\r\nPut the pasta in another pan with 2 tsp salt, pour over some boiling water and cook following pack instructions (usually 3-4 mins). When cooked, scoop some of the cooking water into a heatproof jug or mug and drain the pasta, but not too thoroughly.\r\nAdd the pasta to the pan with the clotted cream mixture, then sprinkle over the cheese and gently fold everything together over a low heat using a rubber spatula. When combined, splash in 3 tbsp of the cooking water. At first, the pasta will look wet and sloppy: keep stirring until the water is absorbed and the sauce is glossy. Check the seasoning before transferring to heated bowls. Sprinkle over some chives or parsley, then serve immediately.",
		"ingredients": [{ "name": "Clotted Cream", "measure": "227g" }, { "name": "Butter", "measure": "25g" }, { "name": "Corn Flour", "measure": "1 tsp" }, { "name": "Parmesan Cheese", "measure": "100g" }, { "name": "Nutmeg", "measure": "Grated" }, { "name": "Fettuccine", "measure": "250g" }, { "name": "Parsley", "measure": "Chopped" }],
		"thumbImageUrl": "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
		"youtubeUrl": "https://www.youtube.com/watch?v=FLEnwZvGzOE",
		"sourceUrl": "https://www.bbcgoodfood.com/recipes/fettucine-alfredo",
		"summary": "Magna nulla adipisicing laborum non magna cillum ullamco tempor consequat Lorem labore cillum. Aliquip ipsum occaecat laboris duis aliqua adipisicing. Ipsum elit nisi dolore elit commodo et laboris laboris ullamco amet cillum dolore pariatur. Exercitation amet non culpa eu anim sint minim aliqua cupidatat elit cillum deserunt. Qui velit commodo dolor dolor est excepteur mollit amet adipisicing reprehenderit.",
		"prepTime": 20,
		"cookTime": 30,
		"servings": 4
	}
];

const validRecipe = {
	"name": "French Omelette",
	"category": "Breakfast",
	"area": "French",
	"instructions": "Get everything ready. Warm a 20cm (measured across the top) non-stick frying pan on a medium heat. Crack the eggs into a bowl and beat them with a fork so they break up and mix, but not as completely as you would for scrambled egg. With the heat on medium-hot, drop one knob of butter into the pan. It should bubble and sizzle, but not brown. Season the eggs with the Parmesan and a little salt and pepper, and pour into the pan.\r\nLet the eggs bubble slightly for a couple of seconds, then take a wooden fork or spatula and gently draw the mixture in from the sides of the pan a few times, so it gathers in folds in the centre. Leave for a few seconds, then stir again to lightly combine uncooked egg with cooked. Leave briefly again, and when partly cooked, stir a bit faster, stopping while there’s some barely cooked egg left. With the pan flat on the heat, shake it back and forth a few times to settle the mixture. It should slide easily in the pan and look soft and moist on top. A quick burst of heat will brown the underside.\r\nGrip the handle underneath. Tilt the pan down away from you and let the omelette fall to the edge. Fold the side nearest to you over by a third with your fork, and keep it rolling over, so the omelette tips onto a plate – or fold it in half, if that’s easier. For a neat finish, cover the omelette with a piece of kitchen paper and plump it up a bit with your fingers. Rub the other knob of butter over to glaze. Serve immediately.",
	"ingredients": [{ "name": "Egg", "measure": "3" }, { "name": "Butter", "measure": "2 knobs" }, { "name": "Parmesan", "measure": "1 tsp" }, { "name": "Tarragon", "measure": "3 chopped" }, { "name": "Parsley", "measure": "1 tbs chopped" }],
	"thumbImageUrl": "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
	"youtubeUrl": "https://www.youtube.com/watch?v=qXPhVYpQLPA",
	"tags": ["Egg"],
	"sourceUrl": "https://www.bbcgoodfood.com/recipes/1669/ultimate-french-omelette",
	"summary": "Non do anim nostrud labore. Deserunt aliquip consequat minim dolor nisi aute amet fugiat do consequat minim Lorem in mollit. Aliqua aliqua officia nisi pariatur pariatur est duis ullamco sint laborum velit deserunt officia dolore. Elit magna cillum est sit culpa veniam Lorem laborum nisi deserunt id incididunt consectetur. Reprehenderit pariatur ea culpa mollit culpa quis officia proident quis magna aliquip veniam pariatur in.",
	"prepTime": 15,
	"cookTime": 35,
	"servings": 2
};

const recipeWithMissingName = { ...validRecipe, name: "" };
const recipeWithMissingInstructions = { ...validRecipe, instructions: "" };
const recipeWithMissingIngredients = { ...validRecipe, ingredients: [] };
const recipeWithMissingSummary = { ...validRecipe, summary: "" };


const plainUsers = [
	{
		username: "username",
		email: "username@mail.com",
		password: "password",
	},
	{
		username: "username2",
		email: "username2@mail.com",
		password: "password2",
	},
	{
		username: "username3",
		email: "username3@mail.com",
		password: "password3",
	},
];

const hashPasswordMixin = (users) => {
	const saltRounds = 10;
	const clonedUsers = JSON.parse(JSON.stringify(users));
	const usersWithHashedPasswords = clonedUsers.map((user) => {
		const passwordHash = bcrypt.hashSync(user.password, saltRounds);
		user.passwordHash = passwordHash;
		delete user.password;

		return user;
	});

	return usersWithHashedPasswords;
};

const initialUsers = hashPasswordMixin(plainUsers);

const getRecipesInDb = async () => {
	const recipes = await Recipe.find({});
	return recipes.map(recipe => recipe.toJSON());
};

const getUsersInDb = async () => {
	const users = await User.find({});
	return users.map(u => u.toJSON());
};

const getDeletedValidRecipeId = async () => {
	const recipe = new Recipe(validRecipe);
	await recipe.save();
	await recipe.remove();
	return recipe._id.toString();
};

module.exports = {
	initialRecipes,
	initialUsers,
	validRecipe,
	recipeWithMissingName,
	recipeWithMissingInstructions,
	recipeWithMissingIngredients,
	recipeWithMissingSummary,
	plainUsers,
	getRecipesInDb,
	getUsersInDb,
	getDeletedValidRecipeId,
};