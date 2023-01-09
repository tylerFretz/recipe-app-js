import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import ToggleableList from '../../components/ToggleableList';

const useStyles = makeStyles({
	contentContainer: {
		display: 'flex',
		alignItems: 'flex-start',
		backgroundColor: '#FFF',
		borderRadius: '3px',
		boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
		padding: '3%',
	},
	listContainer: {
		padding: 0,
	},
});

const ContentInnerFullsScreen = ({ instructions, ingredients }) => {
	const classes = useStyles();

	const ingredientValues = ingredients.map((i) => i.measure + ' - ' + i.name);

	// some of the recipes from theMealDb have numbered steps and some don't. Let's just get rid of them
	instructions = instructions
		.replace(/\d\./gm, '')
		.replace(/(STEP\s+\d+)/gim, '');

	// instructions from theMealDb come as a long string with occaisonal linebreaks. Let's split that into steps
	const instructionsArray = instructions
		.split(/\r?\n/)
		.filter((instruction) => instruction !== '')
		.filter((instruction) => instruction.length > 1);

	return (
		<Container className={classes.contentContainer}>
			<Container className={classes.listContainer}>
				<Typography variant="h4" gutterBottom={true}>
					Ingredients
				</Typography>
				<ToggleableList items={ingredientValues} isNumbered={false} />
			</Container>
			<Container className={classes.listContainer}>
				<Typography variant="h4" gutterBottom={true}>
					Instructions
				</Typography>
				<ToggleableList items={instructionsArray} isNumbered={true} />
			</Container>
		</Container>
	);
};

export default ContentInnerFullsScreen;
