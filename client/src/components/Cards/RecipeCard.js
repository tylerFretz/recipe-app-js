import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

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
		height: '50%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		borderBottom: '1px solid #EEE',
		flexGrow: 1,
	},
	multiLineEllipsis: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		'-webkit-line-clamp': 4,
		'-webkit-box-orient': 'vertical'
	}
});

const RecipeCard = ({ recipe, type, isSubmitted }) => {
	const [imageLoaded, setImageLoaded] = useState(false);
	const history = useHistory();
	const classes = useStyles();
	const { authUser } = useAuthUser();

	if (!recipe.thumbImageUrl) recipe.thumbImageUrl = noImageAvailable;

	const handleClick = () => history.push(`/recipes/${recipe.id}`);

	return (
		<>
			<Card className={classes.recipeCard}>
				<div style={{ overflow: 'hidden', height: '50%', cursor: 'pointer' }}>

					{/* Display skeleton loading indicator while waiting for recipe image to be fetched */}
					{!imageLoaded && <Skeleton animation='wave' variant='rect' height='203px' width='360px' />}
					<img
						style={{ height: '203px', width: '360px', display: imageLoaded ? '' : 'none' }}
						alt={recipe.name}
						src={recipe.thumbImageUrl}
						title={recipe.name}
						onClick={() => handleClick()}
						onLoad={() => setImageLoaded(true)}
					/>
				</div>
				<CardContent className={classes.cardContent}>
					<Typography variant="h5" style={{ fontWeight: 'bold' }}>
						{recipe.name}
					</Typography>
					{recipe.summary && (
						<Typography variant="body1" className={classes.multiLineEllipsis}>{recipe.summary}</Typography>
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
