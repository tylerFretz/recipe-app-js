import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";

import RecipeCard from "../../components/RecipeCard";

const RecipeCardRow = ({ queryType }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	let recipes = [];
	switch(queryType) {
	case "Top Rated":
		recipes = useSelector(state => state.recipes).sort((a, b) => b.upvoteCount - a.upvoteCount).slice(0, 3);
		break;
	case "Latest":
		recipes = useSelector(state => state.recipes).sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 3);
		break;
	default:
		break;
	}

	return (
		<Grid container item spacing={2} style={{ flexDirection: isMobile ? "column" : "row" }}>
			{recipes.map(recipe => (
				<Grid container item xs={isMobile ? 12 : 4} key={recipe.id}>
					<RecipeCard
						key={recipe.id}
						username={recipe.user.username}
						summary={recipe.summary}
						upvoteCount={recipe.upvoteCount}
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
