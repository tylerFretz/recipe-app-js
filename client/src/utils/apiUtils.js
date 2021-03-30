export const formatRecipe = (recipeJSON) => {
	const ingredients = getIngredients(recipeJSON);
	const imageUrl = recipeJSON["strMealThumb"] ?? "";
	const youtubeUrl = recipeJSON["strYoutube"] ?? "";
	const tags = getTags(recipeJSON);
	const sourceUrl = recipeJSON["strSource"] ?? "";

	const recipe = {
		id: parseInt(recipeJSON["idMeal"], 10),
		name: recipeJSON["strMeal"],
		category: recipeJSON["strCategory"],
		area: recipeJSON["strArea"],
		instructions: recipeJSON["strInstructions"],
		ingredients: ingredients,
		thumbImageUrl: imageUrl,
		youtubeUrl: youtubeUrl,
		tags: tags,
		sourceUrl: sourceUrl
	};
	return recipe;
};


const getTags = (recipeJson) => {
	if (!recipeJson["strTags"]) {
		return [""];
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