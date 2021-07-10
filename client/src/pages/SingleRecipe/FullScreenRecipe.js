import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import HeaderText from './HeaderText';
import ContentInnerFullScreen from './ContentInnerFullScreen';
import RecipeFullStats from './RecipeFullStats';
import RelatedSideBar from './RelatedSideBar';
import noImageAvailable from '../../assets/noImageAvailable.jpg';

const useStyles = makeStyles({
	mainContainer: {
		position: 'relative',
		padding: '0% 2%',
		margin: '2% 0%',
		maxWidthXl: '1280px',
	},
	primaryContentArea: {
		position: 'relative',
		display: 'flex',
		justifyContent: 'space-between',
		padding: 0,
	},
	ingredientsInstructionsContainer: {
		width: '70%',
		margin: 0,
		padding: 0,
	},
	sidebar: {
		width: '25%',
		padding: 0,
		margin: 0,
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
	},
	sidebarItem: {
		padding: 0,
		marginBottom: '10%',
	},
	contentHeader: {
		display: 'flex',
		alignItems: 'center',
		left: '50%',
		padding: '0 2%',
		width: '100%',
		transform: 'translateX(-50%)',
		position: 'relative',
		textAlign: 'left',
		marginBottom: '3%',
	},
	headerMediaContainer: {
		display: 'block',
		position: 'relative',
		top: 0,
		left: 0,
		width: '48%',
		height: 0,
		paddingTop: '48%',
		marginBottom: 0,
		borderRadius: '10px',
	},
	headerMedia: {
		display: 'block',
		position: 'absolute',
		marginRight: '5%',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		margin: '0 auto',
		padding: 0,
		borderRadius: '10px',
	},
});

const FullScreenRecipe = ({ recipe, handleVote }) => {
	const classes = useStyles();

	if (!recipe.thumbImageUrl) recipe.thumbImageUrl = noImageAvailable;

	return (
		<Container className={classes.mainContainer}>
			<Container className={classes.contentHeader}>
				<div className={classes.headerMediaContainer}>
					<img
						className={classes.headerMedia}
						src={recipe.thumbImageUrl}
						alt={`Image of ${recipe.name}`}
						title={recipe.name}
					/>
				</div>
				<HeaderText recipe={recipe} />
			</Container>
			<Container className={classes.primaryContentArea}>
				<Container className={classes.ingredientsInstructionsContainer}>
					<ContentInnerFullScreen
						instructions={recipe.instructions}
						ingredients={recipe.ingredients}
					/>
				</Container>
				<Container className={classes.sidebar}>
					<div className={classes.sidebarItem}>
						<RecipeFullStats recipe={recipe} />
					</div>
					<div className={classes.sidebarItem}>
						<RelatedSideBar category={recipe.category} />
					</div>
				</Container>
			</Container>
			<Button onClick={handleVote}>Vote</Button>
		</Container>
	);
};

export default FullScreenRecipe;
