import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import RecipeMediaMobile from './RecipeMediaMobile';
import ContentInnerMobile from './ContentInnerMobile';
import RecipeFullStats from './RecipeFullStats';
import RelatedSideBar from './RelatedSideBar';

const useStyles = makeStyles({
	mobileContainer: {
		width: '100%',
		padding: 0,
		marginBottom: '10%',
	},
	sectionContainer: {
		position: 'relative',
		minHeight: '1px',
		margin: '10% 0%',
	},
	mainContentContainer: {
		position: 'relative',
		background: '#FFF',
		overflow: 'hidden',
		borderRadius: '3px',
		padding: 0,
		boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
	},
});

const MobileRecipe = ({ recipe, handleVote }) => {
	const classes = useStyles();

	return (
		<Container className={classes.mobileContainer}>
			<Container className={classes.sectionContainer}>
				<Container className={classes.mainContentContainer}>
					<RecipeMediaMobile
						thumbImageUrl={recipe.thumbImageUrl}
						youtubeUrl={recipe.youtubeUrl}
						name={recipe.name}
					/>
					<ContentInnerMobile
						name={recipe.name}
						summary={recipe.summary}
						ingredients={recipe.ingredients}
						instructions={recipe.instructions}
					/>
				</Container>
			</Container>
			<Container className={classes.sectionContainer}>
				<RecipeFullStats recipe={recipe} />
			</Container>
			<Container className={classes.sectionContainer}>
				<RelatedSideBar category={recipe.category} />
			</Container>
			<Button onClick={handleVote}>Vote</Button>
		</Container>
	);
};

export default MobileRecipe;
