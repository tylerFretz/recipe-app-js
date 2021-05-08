import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import RecipeMediaMobile from "./RecipeMediaMobile";
import ContentInnerMobile from "./ContentInnerMobile";

const useStyles = makeStyles({
	mobileContainer: {
		width: "100%",
		padding: 0,
		marginBottom: "10%"
	},
	sectionContainer: {
		position: "relative",
		minHeight: "1px",
	},
	mainContentContainer: {
		position: "relative",
		background: "#fff",
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
					<RecipeMediaMobile thumbImageUrl={recipe.thumbImageUrl} youtubeUrl={recipe.youtubeUrl} />
					<ContentInnerMobile name={recipe.name} summary={recipe.summary} ingredients={recipe.ingredients} instructions={recipe.instructions} />
				</Container>
			</Container>
		</Container>
	);
};

export default MobileRecipe;