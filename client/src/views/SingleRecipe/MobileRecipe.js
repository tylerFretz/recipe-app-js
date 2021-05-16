import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import RecipeMediaMobile from "./RecipeMediaMobile";
import ContentInnerMobile from "./ContentInnerMobile";
import RecipeFullStats from "./RecipeFullStats";

const useStyles = makeStyles({
	mobileContainer: {
		width: "100%",
		padding: 0,
		marginBottom: "10%"
	},
	sectionContainer: {
		position: "relative",
		minHeight: "1px",
		background: "F5F5F5"
	},
	mainContentContainer: {
		position: "relative",
		background: "#FFF",
		marginTop: "7%",
		overflow: "hidden",
		borderRadius: "3px",
		padding: 0
	}
});

const MobileRecipe = ({ recipe }) => {
	const classes = useStyles();

	return (
		<Container className={classes.mobileContainer}>
			<Container className={classes.sectionContainer}>
				<Container className={classes.mainContentContainer}>
					<RecipeMediaMobile thumbImageUrl={recipe.thumbImageUrl} youtubeUrl={recipe.youtubeUrl} name={recipe.name} />
					<ContentInnerMobile name={recipe.name} summary={recipe.summary} ingredients={recipe.ingredients} instructions={recipe.instructions} />
				</Container>
			</Container>
			<Container className={classes.sectionContainer}>
				<RecipeFullStats
					username={recipe.user.username}
					prepTime={recipe.prepTime}
					cookTime={recipe.cookTime}
					servings={recipe.servings}
					area={recipe.area}
					category={recipe.category}
					upvoteCount={recipe.upvoteCount}
					dateAdded={recipe.dateAdded}
				/>
			</Container>
		</Container>
	);
};

export default MobileRecipe;