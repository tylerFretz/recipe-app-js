import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import RecipeCardRow from "./RecipeCardRow";

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column"
		},
		[theme.breakpoints.up("md")]: {
			flexDirection: "row"
		},
	},
	rowContainer: {
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column"
		},
		[theme.breakpoints.up("md")]: {
			flexDirection: "row",
		},
		margin: "2% 0%"
	}
}));

const chunk = (arr, size) =>
	Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
		arr.slice(i * size, i * size + size)
	);

const RecipeCardGrid = ({ recipes }) => {
	const classes = useStyles();
	const recipeGroups = chunk(recipes, 3);

	return (
		<Grid container className={classes.mainContainer}>
			{recipeGroups.map((group, i) => (
				<Grid container item xs={12} spacing={3} key={i} className={classes.rowContainer}>
					<RecipeCardRow recipes={group} />
				</Grid>
			))}
		</Grid>
	);
};

export default RecipeCardGrid;