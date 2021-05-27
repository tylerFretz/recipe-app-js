import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-material-ui-carousel";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";

import RecipeStats from "./RecipeStats";
import useRecipes from "../hooks/useRecipes";

const useStyles = makeStyles((theme) => ({
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
		minHeight: "100px",
		zIndex: 1,
	},
	captionContent: {
		position: "absolute",
		padding: "2% 5%",
		bottom: 0,
		left: 0,
		width: "100%",
		zIndex: 2,
		color: "#ffff",
		textShadow: "1px 1px 2px rgba(0,0,0,1)",
	},
	linkText: {
		color: "#ffff",
		textDecoration: "none",
		display: "inline-block",
		[theme.breakpoints.down("sm")]: {
			fontSize: "0.8em"
		},
	},
	recipeStatsContainer: {
		display: "flex",
		width: "40%",
		alignItems: "center"
	},
	svgOverlay: {
		position: "absolute",
		[theme.breakpoints.down("sm")]: {
			top: "55%"
		},
		[theme.breakpoints.up("md")]: {
			top: "66%"
		},
		width: "100%",
		minHeight: "66%",
		rotate: "180deg"
	}
}));

const JumboTronCarousel = () => {
	const { queryRecipes } = useRecipes();
	const { data: randomRecipes, isLoading } = queryRecipes({ "random": "true" });

	return isLoading ? (
		null
	) : (
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
		<>
			<Paper className={classes.imageContainer}>
				<img src={recipe.thumbImageUrl} className={classes.image} />
				<div className={classes.imageOverlay}>
					<div className={classes.captionContent}>
						<NavLink to={`/recipes/${recipe.id}`} className={classes.linkText}>
							<h1>{recipe.name}</h1>
						</NavLink>
						<Hidden smDown>
							<div className={classes.recipeStatsContainer}>
								<h3 style={{ fontSize: "1.3em" }}>By {recipe.user.username}</h3>
								<RecipeStats stats={{ upvoteCount: recipe.upvoteCount, prepTime: recipe.prepTime, cookTime: recipe.cookTime, servings: recipe.servings }} variant="body2" />
							</div>
						</Hidden>
					</div>
				</div>
			</Paper>
			<svg className={classes.svgOverlay}>
				<defs>
					<filter id="blur">
						<feGaussianBlur in="SourceGraphic" stdDeviation="20" />
					</filter>
				</defs>
				<image filter="url(#blur)" xlinkHref={recipe.thumbImageUrl} x="0" y="0" width="100%" />
			</svg>
		</>
	);
};

export default JumboTronCarousel;