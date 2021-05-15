import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FullScreenRecipe from "./FullScreenRecipe";
import MobileRecipe from "./MobileRecipe";

import { upvoteRecipe } from "../../store/actions/recipeActions";

const SingleRecipe = () => {
	const theme = useTheme();
	const history = useHistory();
	const dispatch = useDispatch();
	const renderMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const recipeMatch = useRouteMatch("/recipes/:id");

	const recipe = recipeMatch
		? useSelector(state => state.recipes.find(recipe => recipe.id === recipeMatch.params.id))
		: null;

	const handleVote = () => {
		dispatch(upvoteRecipe(recipe.id));
		console.log(recipe);
	};

	if (!recipe) {
		history.push("/");
		return null;
	}

	if (renderMobile) {
		return <MobileRecipe recipe={recipe} handleVote={handleVote}/>;
	}

	return (
		<FullScreenRecipe recipe={recipe} handleVote={handleVote}/>
	);
};

export default SingleRecipe;