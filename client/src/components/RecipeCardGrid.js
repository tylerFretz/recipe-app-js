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

const RecipeCardGrid = ({ recipes }) => {
	const classes = useStyles();

	const firstRecipes = recipes.slice(0, 3);
	const secondRecipes = recipes.slice(3, 6);
	const thirdRecipes = recipes.slice(6, 9);
	const fourthRecipes = recipes.slice(9, 12);

	return (
		<Grid container className={classes.mainContainer}>
			<Grid container item xs={12} spacing={3} className={classes.rowContainer}>
				<RecipeCardRow recipes={firstRecipes} />
			</Grid>
			<Grid container item xs={12} spacing={3} className={classes.rowContainer}>
				<RecipeCardRow recipes={secondRecipes} />
			</Grid>
			<Grid container item xs={12} spacing={3} className={classes.rowContainer}>
				<RecipeCardRow recipes={thirdRecipes} />
			</Grid>
			<Grid container item xs={12} spacing={3} className={classes.rowContainer}>
				<RecipeCardRow recipes={fourthRecipes} />
			</Grid>
		</Grid>
	);
};

export default RecipeCardGrid;