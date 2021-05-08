import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FullScreenRecipe from "./FullScreenRecipe";
import MobileRecipe from "./MobileRecipe";

const SingleRecipe = () => {
	const theme = useTheme();
	const history = useHistory();

	const recipeMatch = useRouteMatch("/recipes/:id");
	const recipe = recipeMatch
		? useSelector(state => state.recipes.find(recipe => recipe.id === recipeMatch.params.id))
		: null;

	if (!recipe) {
		history.push("/");
		return null;
	}

	const renderMobile = useMediaQuery(theme.breakpoints.down("sm"));

	if (renderMobile) {
		return <MobileRecipe recipe={recipe} />;
	}

	return (
		<FullScreenRecipe recipe={recipe} />
	);
};

export default SingleRecipe;