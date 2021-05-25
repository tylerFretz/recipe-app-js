import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

import HeaderText from "./HeaderText";
import Content from "./Content";
import noImageAvailable from "../../assets/noImageAvailable.jpg";

const useStyles = makeStyles({
	fullScreenContainer: {
		padding: "0 2%",
		marginTop: "5%",
		width: "100%",
	},
	primaryContentArea: {
		position: "relative",
		margin: "auto",
		padding: "5%",
		maxWidthXl: "1280px"
	},
	contentHeader: {
		display: "flex",
		alignItems: "center",
		left: "50%",
		padding: "0 5%",
		width: "100%",
		transform: "translateX(-50%)",
		position: "relative",
		textAlign: "left",
		marginBottom: "10%",
	},
	headerMediaContainer: {
		display: "block",
		position: "relative",
		top: 0,
		left: 0,
		width: "48%",
		height: 0,
		paddingTop: "48%",
		marginBottom: 0,
		borderRadius: "10px",
	},
	headerMedia: {
		display: "block",
		position: "absolute",
		marginRight: "5%",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		margin: "0 auto",
		padding: 0,
		borderRadius: "10px",
	},
});

const FullScreenRecipe = ({ recipe, handleVote }) => {
	const classes = useStyles();

	if (!recipe.thumbImageUrl) recipe.thumbImageUrl = noImageAvailable;

	return (
		<Container className={classes.fullScreen}>
			<Container className={classes.primaryContentArea}>
				<Container className={classes.contentHeader}>
					<div className={classes.headerMediaContainer}>
						<img className={classes.headerMedia} src={recipe.thumbImageUrl} alt={`Image of ${recipe.name}`} title={recipe.name} />
					</div>
					<HeaderText
						category={recipe.category}
						name={recipe.name}
						upvoteCount={recipe.upvoteCount}
						comments={recipe.comments}
						summary={recipe.summary}
						dateAdded={recipe.dateAdded}
						tags={recipe.tags}
						user={recipe.user}
						handleVote={handleVote}
					/>
				</Container>
				<Content
					instructions={recipe.instructions}
					ingredients={recipe.ingredients}
					youtubeUrl={recipe.youtubeUrl}
				/>
			</Container>
			<Button onClick={handleVote}>Vote</Button>
		</Container>
	);
};

export default FullScreenRecipe;