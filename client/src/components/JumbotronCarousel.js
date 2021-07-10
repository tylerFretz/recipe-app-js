import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';
import Hidden from '@material-ui/core/Hidden';

import RecipeStats from './RecipeStats';
import useRecipes from '../hooks/useRecipes';

const useStyles = makeStyles((theme) => ({
	imageContainer: {
		display: 'block',
		position: 'relative',
		width: '100%',
		paddingTop: '48%',
		marginBottom: 0,
	},
	image: {
		display: 'block',
		position: 'absolute',
		marginRight: '5%',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		margin: '0 auto',
		padding: 0,
	},
	imageOverlay: {
		position: 'absolute',
		[theme.breakpoints.down('sm')]: {
			top: '55%',
		},
		[theme.breakpoints.up('md')]: {
			top: '66%',
		},
		width: '100%',
		minHeight: '66%',
		zIndex: 1,
	},
	captionContent: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		padding: '0% 5%',
		width: '100%',
		zIndex: 2,
		color: '#ffff',
		textShadow: '1px 1px 2px rgba(0,0,0,1)',
		marginTop: '2%',
	},
	title: {
		color: '#ffff',
		textDecoration: 'none',
		display: 'inline-block',
		fontSize: '1.5rem',
		margin: 0,
	},
	recipeStatsContainer: {
		display: 'flex',
		width: '40%',
		alignItems: 'center',
	},
	svgOverlay: {
		position: 'absolute',
		[theme.breakpoints.down('sm')]: {
			top: '55%',
		},
		[theme.breakpoints.up('md')]: {
			top: '66%',
		},
		width: '100%',
		minHeight: '66%',
		rotate: '180deg',
	},
}));

const JumboTronCarousel = () => {
	const { queryRecipes } = useRecipes();
	const { data: randomRecipes, isLoading } = queryRecipes({ random: 'true' });

	return isLoading ? null : (
		<Carousel
			animation="slide"
			indicators={false}
			interval={10000}
			navButtonsAlwaysVisible={true}
			navButtonsProps={{ style: { opacity: 0.65 } }}
		>
			{randomRecipes.map((recipe, i) => (
				<CarouselItem key={i} recipe={recipe} />
			))}
		</Carousel>
	);
};

const CarouselItem = ({ recipe }) => {
	const classes = useStyles();

	return (
		<>
			<NavLink to={`/recipes/${recipe.id}`}>
				<Paper className={classes.imageContainer}>
					<img src={recipe.thumbImageUrl} className={classes.image} />
					<div className={classes.imageOverlay}>
						<div className={classes.captionContent}>
							<h1 className={classes.title}>{recipe.name}</h1>
							<Hidden smDown>
								<h4>{recipe.summary}</h4>
								<div className={classes.recipeStatsContainer}>
									<h3
										style={{ fontSize: '1.3em', margin: 0 }}
									>
										By {recipe.user.username}
									</h3>
									<RecipeStats
										stats={{
											upvoteCount: recipe.upvoteCount,
											prepTime: recipe.prepTime,
											cookTime: recipe.cookTime,
											servings: recipe.servings,
										}}
										variant="body2"
									/>
								</div>
							</Hidden>
						</div>
					</div>
				</Paper>
			</NavLink>
			<svg className={classes.svgOverlay}>
				<defs>
					<filter id="blur">
						<feGaussianBlur in="SourceGraphic" stdDeviation="20" />
					</filter>
				</defs>
				<image
					filter="url(#blur)"
					xlinkHref={recipe.thumbImageUrl}
					x="0"
					y="0"
					width="100%"
				/>
			</svg>
		</>
	);
};

export default JumboTronCarousel;
