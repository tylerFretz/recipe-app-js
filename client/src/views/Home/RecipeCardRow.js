import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";

import RecipeCard from "../../components/RecipeCard";

const RecipeCardRow = ({ queryType }) => {

	let recipes = [];
	switch(queryType) {
	case "Top Rated":
		recipes = useSelector(state => state.recipes).sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);
		break;
	case "Latest":
		recipes = useSelector(state => state.recipes).sort((a, b) => b.dateAdded - a.dateAdded).slice(0, 3);
		break;
	default:
		break;
	}

	return (
		<Grid container item spacing={2}>
			{recipes.map(recipe => (
				<Grid container item xs={4} key={recipe.id}>
					<RecipeCard
						key={recipe.id}
						user={recipe.user}
						summary={recipe.summary}
						upvotes={recipe.upvotes}
						thumbImageUrl={recipe.thumbImageUrl}
						id={recipe.id}
						name={recipe.name}
					/>
				</Grid>
			))}
		</Grid>
	);
};

RecipeCardRow.propTypes = {
	queryType: PropTypes.oneOf(["Top Rated", "Latest"]).isRequired
};

export default RecipeCardRow;
