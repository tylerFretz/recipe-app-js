import React from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import YouTubePlayer from "./YouTubePlayer";

//FIXME: fix dividers on instructions list
//TODO: add tools list a la https://ememrecipes.com/

const useStyles = makeStyles({
	contentContainer: {
		width: "80%",
		padding: "2% 0%",
		backgroundColor: "#fcf9f5",
		border: "1px solid #f8eee0",
		borderRadius: "4px",
		textAlign: "left"
	},
	textContainer: {
		display: "flex",
		width: "100%",
	},
	sectionTitle: {
		variant: "h3",
		fontSize: "1.75rem",
		fontWeight: 500,
		marginBottom: "5%",
	},
	instructionsContainer: {
		display: "flex",
		flexDirection: "column",
		width: "60%",
	},
	dividerContainer: {
		display: "inline-flex",
		marginTop: "3%",
		marginBottom: "2%",
	},
	dividerText: {
		color: "red",
		textTransform: "uppercase"
	},
	instructionText: {
		marginTop: 0,
		marginBottom: "1rem",
	},
	ingredientsContainer: {
		display: "flex",
		flexDirection: "column",
		width: "40%",
	},
	ingredientList: {
		paddingLeft: 0,
		listStyle: "none",
		color: "#4a4a4a",
		marginBottom: "1rem"
	},
	ingredientListItem: {
		padding: "1rem 0 1rem",
		marginBottom: "1rem",
		borderBottom: "1px solid #eaecf0",
		width: "100%"
	}
});

const Content = ({ instructions, ingredients, youtubeUrl }) => {
	const classes = useStyles();

	// some of the recipes from theMealDb have numbered steps and some don't. Let's just get rid of them
	instructions = instructions.replace(/\d\./gm, "").replace(/(STEP\s+\d+)/gmi, "");

	// instructions from theMealDb come as a long string with occaisonal linebreaks. Let's split that into steps
	const intructionsArray = instructions.split(/\r?\n/).filter(instruction => instruction !== "");

	return (
		<Container className={classes.contentContainer}>
			<Container className={classes.textContainer}>
				<Container className={classes.instructionsContainer}>
					<Typography className={classes.sectionTitle}>Instructions</Typography>
					{intructionsArray.map((instruction, index) => (
						<Container key={index}>
							<Container className={classes.dividerContainer}>
								<Typography className={classes.dividerText}>step {index + 1}</Typography>
								<Divider />
							</Container>
							<Typography className={classes.instructionText}>{instruction}</Typography>
						</Container>
					))}
					<Container>
						<Container className={classes.dividerContainer}>
							<Typography className={classes.dividerText}>last step!</Typography>
							<Divider />
						</Container>
						<Typography className={classes.instructionText}>Enjoy!</Typography>
					</Container>
				</Container>
				<Container className={classes.ingredientsContainer}>
					<Typography className={classes.sectionTitle}>Ingredients</Typography>
					<ul className={classes.ingredientList}>
						{ingredients.map(({ name, measure }) => (
							<li key={uuid()} className={classes.ingredientListItem}>
								{measure}{" "}{name}
							</li>
						))}
					</ul>
				</Container>
			</Container>
			{youtubeUrl && (
				<YouTubePlayer youtubeUrl={youtubeUrl} />
			)}
		</Container>
	);
};

Content.propTypes = {
	instructions: PropTypes.string,
	ingredients: PropTypes.array,
};

export default Content;