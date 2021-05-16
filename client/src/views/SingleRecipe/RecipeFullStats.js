import React from "react";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	statsContainer: {
		backgroundColor: "#FFF",
		marginTop: "10%",
		padding: "5%",
		borderRadius: "3px",
		position: "relative",
		boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
	},
	statsList: {
		padding: 0,
		margin: 0,
		listStyle: "none",
		color: theme.palette.darkGrey.main,
	},
	listItem: {
		padding: "3% 0%",
		listStyle: "none",
		borderBottom: "1px solid #EEE"
	},
	recipeOwner: {
		listStyle: "none"
	}
}));

const RecipeFullStats = ({ username, prepTime, cookTime, servings, area, category, upvoteCount, dateAdded }) => {
	const classes = useStyles();

	const formattedDate = format( new Date(dateAdded), "MMMM dd, yyyy");
	if (!prepTime) prepTime = "?";
	if (!cookTime) cookTime = "?";
	if (!servings) servings = "?";

	const stats = [
		{ title: "Preperation Time:", value: prepTime },
		{ title: "Cook Time:", value: cookTime },
		{ title: "Servings:", value: servings },
		{ title: "Cuisine:", value: area },
		{ title: "Category:", value: category },
		{ title: "Upvotes:", value: upvoteCount },
		{ title: "Created:", value: formattedDate },
	];

	return (
		<Paper className={classes.statsContainer}>
			<ul className={classes.statsList}>
				<li className={classes.recipeOwner}>
					<h4>By <span style={{ fontSize: "1.25em" }}>{username}</span></h4>
				</li>
				{stats.map(({ title, value }) => (
					<li key={title} className={classes.listItem}>
						{title}
						<span style={{ float: "right" }}>{value}</span>
					</li>
				))}
			</ul>
		</Paper>
	);
};

export default RecipeFullStats;

//TODO: Add link to user's profile (also create user profile pages... scope creep is real)