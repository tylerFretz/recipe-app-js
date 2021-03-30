import React from "react";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";
// import axios from "axios";

// import mealDbApiService from "./services/mealDbApiService";
// import  { formatRecipe } from "./utils/apiUtils";
// import { useStateValue, setRecipeList } from "./state";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import RandomRecipe from "./components/RandomRecipe";

const App = () => {


	// useEffect(() => {
	// 	const fetchRecipeList = async () => {
	// 		try {
	// 			const { data: recipeList } = await axios.get(`${backEndBaseUrl}/recipes`);
	// 			dispatch(setRecipeList(recipeList));
	// 		} catch (e) {
	// 			console.error(e);
	// 		}
	// 	};
	// 	fetchRecipeList();
	// }, []);

	// const getNewRandomRecipe = () => {
	// 	mealDbApiService
	// 		.getRandomRecipe()
	// 		.then(newRecipe => setRandomRecipe(formatRecipe(newRecipe)))
	// 		.catch(err => console.error(err));
	// 	console.log(randomRecipe);
	// };

	return (
		<Container>
			<Navigation />

			<Switch>
				<Route path="/random" component={RandomRecipe} />
				<Route path="/" component={Home} />
			</Switch>
		</Container>
	);
};

export default App;