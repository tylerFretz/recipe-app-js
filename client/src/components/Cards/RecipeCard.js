import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { useAuthUser } from '../../hooks/useAuthUser';
import RecipeStats from '../RecipeStats';
import RecipeCardActions from './RecipeCardActions';
import noImageAvailable from '../../assets/noImageAvailable.jpg';

const useStyles = makeStyles({
	recipeCard: {
		height: '100%',
		maxHeight: '475px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-end',
		maxWidth: 360,
	},
	cardContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		borderBottom: '1px solid #EEE',
		flexGrow: 1,
	},
});

const RecipeCard = ({ recipe, type, isSubmitted }) => {
	const history = useHistory();
	const classes = useStyles();
	const { authUser } = useAuthUser();

	if (!recipe.thumbImageUrl) recipe.thumbImageUrl = noImageAvailable;

	const handleClick = () => history.push(`/recipes/${recipe.id}`);

	return (
		<>
			<Card className={classes.recipeCard}>
				<div style={{ overflow: 'hidden', height: '50%' }}>
					<CardMedia
						component="img"
						alt={recipe.name}
						image={recipe.thumbImageUrl}
						title={recipe.name}
						onClick={() => handleClick()}
					/>
				</div>
				<CardContent className={classes.cardContent}>
					<Typography variant="h5" style={{ fontWeight: 'bold' }}>
						{recipe.name}
					</Typography>
					{recipe.summary && (
						<Typography variant="body1">{recipe.summary}</Typography>
					)}
					<Typography variant="subtitle2">
						By{' '}
						<span style={{ fontSize: '1.2em' }}>
							{recipe.user.username}
						</span>
					</Typography>
				</CardContent>
				<RecipeStats
					stats={{
						upvoteCount: recipe.upvoteCount,
						prepTime: recipe.prepTime,
						cookTime: recipe.cookTime,
						servings: recipe.servings,
					}}
					variant="body1"
				/>
			</Card>

			{/* Display delete option if recipe card is used in the profile page and recipe belongs to user */}
			{type && type === 'profile' && authUser && authUser.id === recipe.user.id && (
				<RecipeCardActions recipe={recipe} isSubmitted={isSubmitted} />
			)}
		</>
	);
};

export default RecipeCard;
