import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import mealDbApiService from "../services/mealDbApiService";
import { formatRecipe } from "../utils/apiUtils";

const RandomRecipe = () => {
	const [randomRecipe, setRandomRecipe] = useState(null);

	useEffect(() => {
		mealDbApiService
			.getRandomRecipe()
			.then(recipe => setRandomRecipe(formatRecipe(recipe)))
			.catch(err => console.error(err));
	}, []);

	const getNewRandomRecipe = () => {
		mealDbApiService
			.getRandomRecipe()
			.then(newRecipe => setRandomRecipe(formatRecipe(newRecipe)))
			.catch(err => console.error(err));
		console.log(randomRecipe);
	};

	if (!randomRecipe) return null;

	return (
		<div>
			<h1>{randomRecipe.name}</h1>
			<br/>
			{randomRecipe.thumbImageUrl && (
				<img src={randomRecipe.thumbImageUrl} />
			)}
			<ul>
				{randomRecipe.ingredients.map(i => (
					<li key={uuidv4()}>{i.name}{" "}{i.measure}</li>
				))}
			</ul>
			<br/>
			<p>{randomRecipe.instructions}</p>
			{randomRecipe.youtubeUrl && (
				<p>Click <a href={randomRecipe.youtubeUrl} target="_blank" rel="noreferrer">here</a> to watch someone better than you make it.</p>
			)}
			<br />
			<button onClick={() => getNewRandomRecipe()}>Get new recipe</button>
		</div>
	);
};

export default RandomRecipe;