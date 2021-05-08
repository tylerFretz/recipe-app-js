export const formatApiData = (recipeJSON) => {
	const ingredients = getIngredients(recipeJSON);
	const imageUrl = recipeJSON["strMealThumb"] ?? "";
	const youtubeUrl = recipeJSON["strYoutube"] ?? "";
	const tags = getTags(recipeJSON);
	const sourceUrl = recipeJSON["strSource"] ?? "";

	const recipe = {
		id: parseInt(recipeJSON["idMeal"], 10),
		name: recipeJSON["strMeal"].trim(),
		category: recipeJSON["strCategory"].trim(),
		area: recipeJSON["strArea"].trim(),
		instructions: recipeJSON["strInstructions"].trim(),
		ingredients: ingredients,
		thumbImageUrl: imageUrl.trim(),
		youtubeUrl: youtubeUrl.trim(),
		tags: tags,
		sourceUrl: sourceUrl.trim(),
		upvotes: null,
		dateAdded: null,
		summary: null,
		user: null
	};
	return recipe;
};


const getTags = (recipeJson) => {
	if (!recipeJson["strTags"]) {
		return [];
	}
	return recipeJson["strTags"].split(",");
};

const getIngredients = (recipeJSON) => {
	const ingredients = Object.entries(recipeJSON)
		.filter(entry => entry[0].startsWith("strIngredient"))
		.filter(entry =>  !!entry[1])
		.map(entry => entry[1]);

	const measures = Object.entries(recipeJSON)
		.filter(entry => entry[0].startsWith("strMeasure"))
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