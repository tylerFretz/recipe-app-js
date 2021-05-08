import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import ToggleableList from "../../components/ToggleableList";

const useStyles = makeStyles({
	contentContainer: {
		padding: "5%",
		marginTop: "10%",
		border: "1px solid black"
	},
	listContainer: {
		padding: 0
	}
});

const ContentInnerMobile = ({ name, summary, ingredients, instructions }) => {
	const classes = useStyles();

	// recipes from theMealDb do not include a summary
	if (!summary) {
		summary = "I guess the creator did not provide a summary ¯\\_(ツ)_/¯. Sorry...";
	}

	const ingredientValues = ingredients.map(i => i.measure + " " + i.name);

	// some of the recipes from theMealDb have numbered steps and some don't. Let's just get rid of them
	instructions = instructions.replace(/\d\./g, "");

	// instructions from theMealDb come as a long string with occaisonal linebreaks. Let's split that into steps
	const instructionsArray = instructions.split(/\r?\n/).filter(instruction => instruction !== "");

	return (
		<Container className={classes.contentContainer}>
			<Typography variant="h1" gutterBottom={true} style={{ fontFamily: "Londrina" }}>{name}</Typography>
			<Typography variant="body1">{summary}</Typography>
			<hr/>
			<Container className={classes.listContainer}>
				<Typography variant="h4" gutterBottom={true}>Ingredients</Typography>
				<ToggleableList items={ingredientValues} isNumbered={false} />
			</Container>
			<Container className={classes.listContainer}>
				<Typography variant="h4" gutterBottom={true}>Steps</Typography>
				<ToggleableList items={instructionsArray} isNumbered={true} />
			</Container>
		</Container>
	);
};

export default ContentInnerMobile;