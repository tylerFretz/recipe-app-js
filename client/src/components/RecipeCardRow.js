import React from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";

import RecipeCard from "./RecipeCard";

const RecipeCardRow = ({ recipes }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Grid container spacing={3} style={{ flexDirection: isMobile ? "column" : "row" }}>
			{recipes.map(recipe => (
				<Grid container item xs={isMobile ? 12 : 4} key={recipe.id} style={{ justifyContent: "center" }}>
					<RecipeCard
						key={recipe.id}
						recipe={recipe}
					/>
				</Grid>
			))}
		</Grid>
	);
};

export default RecipeCardRow;
