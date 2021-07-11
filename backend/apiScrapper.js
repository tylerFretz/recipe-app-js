const app = require('./app');
const http = require('http');
const supertest = require('supertest');
const config = require('./utils/config');
const logger = require('./utils/logger');
const Recipe = require('./models/recipe');
const axios = require('axios');

const server = http.createServer(app);

server.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`);
});

const api = supertest(app);

const getRandomRecipe = async () => {
	const request = axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
	const response = await request;
	return response.data.meals[0];
};

const getRecipesInDb = async () => {
	const recipes = await Recipe.find({});
	return recipes.map(recipe => recipe.toJSON());
};

const formatApiData = (recipeJSON) => {
	const ingredients = getIngredients(recipeJSON);
	const imageUrl = recipeJSON['strMealThumb'] ? recipeJSON['strMealThumb'].trim() : undefined;
	const youtubeUrl = recipeJSON['strYoutube'] ? recipeJSON['strYoutube'].trim() : undefined;
	const tags = getTags(recipeJSON);
	const sourceUrl = recipeJSON['strSource'] ? recipeJSON['strSource'].trim() : undefined;
	const category = recipeJSON['strCategory'] ? recipeJSON['strCategory'].trim() : 'Miscellaneous';

	const recipe = {
		name: recipeJSON['strMeal'],
		category: category,
		area: recipeJSON['strArea'] || undefined,
		instructions: recipeJSON['strInstructions'],
		ingredients: ingredients,
		thumbImageUrl: imageUrl,
		youtubeUrl: youtubeUrl,
		tags: tags,
		sourceUrl: sourceUrl,
	};
	return recipe;
};

const getTags = (recipeJson) => {
	if (!recipeJson['strTags']) {
		return undefined;
	}
	return recipeJson['strTags'].split(',');
};

const getIngredients = (recipeJSON) => {
	const ingredients = Object.entries(recipeJSON)
		.filter(entry => entry[0].startsWith('strIngredient'))
		.filter(entry => !!entry[1])
		.map(entry => entry[1]);

	const measures = Object.entries(recipeJSON)
		.filter(entry => entry[0].startsWith('strMeasure'))
		.filter(entry => !!entry[1])
		.map(entry => entry[1]);

	let result = [];

	for (let i = 0; i < ingredients.length; i++) {
		const newIngredient = {
			name: ingredients[i],
			measure: measures[i]
		};
		result = result.concat(newIngredient);
	}
	return result;
};

const insertIntoDb = async (token) => {
	const recipesInDb = await getRecipesInDb();
	const randomRecipe = await getRandomRecipe();
	const recipesInDbNames = recipesInDb.map(recipe => recipe.name);

	console.log(`Amount of recipes in db: ${recipesInDb.length}`);
	console.log('\n---');

	if (recipesInDbNames.includes(randomRecipe.strMeal)) {
		console.log(randomRecipe.strMeal);
		console.log('Already have this recipe.');
	}
	else {
		const formattedRecipe = formatApiData(randomRecipe);
		await api
			.post('/api/recipes')
			.set('Authorization', `bearer ${token}`)
			.send(formattedRecipe);

		console.log(`Inserted ${formattedRecipe.name}`);
	}
};


const intervalFunction = async () => {
	const response = await api
		.post('/api/login')
		.set('Content-Type', 'application/json')
		.send({ username: 'recipeapp', email: 'fretztyler@gmail.com', password: 'password' });

	await insertIntoDb(response.body.token);
};

setInterval(intervalFunction, 1000);