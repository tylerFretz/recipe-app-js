import React from 'react';
import { format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	statsContainer: {
		backgroundColor: '#FFF',
		padding: '5%',
		borderRadius: '3px',
		position: 'relative',
		boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
	},
	statsList: {
		padding: 0,
		margin: 0,
		listStyle: 'none',
		color: '#676767',
	},
	listItem: {
		padding: '3% 0%',
		listStyle: 'none',
		borderBottom: '1px solid #EEE',
	},
	recipeOwner: {
		listStyle: 'none',
	},
	userLink: {
		textDecoration: 'none',
		fontSize: '1.25em',
		color: '#676767',
		'&:hover': {
			color: theme.palette.secondary.main,
		},
	},
}));

const RecipeFullStats = ({ recipe }) => {
	const classes = useStyles();

	const formattedDate = format(new Date(recipe.dateAdded), 'MMMM dd, yyyy');
	if (!recipe.prepTime) recipe.prepTime = '?';
	if (!recipe.cookTime) recipe.cookTime = '?';
	if (!recipe.servings) recipe.servings = '?';

	const stats = [
		{ title: 'Preperation Time:', value: recipe.prepTime },
		{ title: 'Cook Time:', value: recipe.cookTime },
		{ title: 'Servings:', value: recipe.servings },
		{ title: 'Cuisine:', value: recipe.area },
		{ title: 'Category:', value: recipe.category },
		{ title: 'Upvotes:', value: recipe.upvoteCount },
		{ title: 'Created:', value: formattedDate },
	];

	return (
		<Paper className={classes.statsContainer}>
			<ul className={classes.statsList}>
				<li className={classes.recipeOwner}>
					<h3>
						By{' '}
						<Link
							to={`/users/${recipe.user.id}`}
							className={classes.userLink}
						>
							{recipe.user.username}
						</Link>
					</h3>
				</li>
				{stats.map(({ title, value }) => (
					<li key={title} className={classes.listItem}>
						{title}
						<span style={{ float: 'right' }}>{value}</span>
					</li>
				))}
			</ul>
		</Paper>
	);
};

export default RecipeFullStats;
