import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";

import RecipeStats from "./RecipeStats";


const useStyles = makeStyles({
	imageContainer: {
		display: "block",
		position: "relative",
		top: 0,
		left: 0,
		width: "100%",
		height: 0,
		paddingTop: "48%",
		marginBottom: 0,
	},
	image: {
		display: "block",
		position: "absolute",
		marginRight: "5%",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		margin: "0 auto",
		padding: 0,
		cursor: "move"
	},
	imageOverlay: {
		position: "absolute",
		bottom: 0,
		left: 0,
		height: "33%",
		width: "100%",
		backgroundColor: "rgba( 255, 255, 255, 0.6)",
		zIndex: 2,
		minHeight: "100px",
		filter: "blur(0.001px)",
	},
	captionContent: {
		padding: "2% 5%",
		bottom: 0,
		left: 0,
		width: "100%",
		zIndex: 2,
		color: "#ffff",
		textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
	},
	linkText: {
		color: "#ffff",
		textDecoration: "none",
		display: "inline-block"
	},
	recipeStatsContainer: {
		display: "flex",
		width: "40%",
		alignItems: "center"
	}
});

const JumboTronCarousel = () => {
	const randomRecipes = useSelector(state => state.recipes.sort(() => Math.random() - Math.random()).slice(0, 3));

	return (
		<Carousel
			animation="slide"
			indicators={false}
			interval={10000}
		>
			{
				randomRecipes.map((recipe, i) => <CarouselItem key={i} recipe={recipe} />)
			}
		</Carousel>

	);
};

const CarouselItem = ({ recipe }) => {
	const classes = useStyles();

	return (
		<Paper className={classes.imageContainer}>
			<img src={recipe.thumbImageUrl} className={classes.image} />
			<div className={classes.imageOverlay}>
				<div className={classes.captionContent}>
					<NavLink to={`/recipes/${recipe.id}`} className={classes.linkText}>
						<h1>{recipe.name}</h1>
					</NavLink>
					<Hidden smDown>
						<div className={classes.recipeStatsContainer}>
							<h3>By {recipe.user.username}</h3>
							<RecipeStats upvoteCount={recipe.upvoteCount} prepTime={recipe.prepTime} cookTime={recipe.cookTime} servings={recipe.servings} />
						</div>
					</Hidden>
				</div>
			</div>
		</Paper>
	);
};

export default JumboTronCarousel;