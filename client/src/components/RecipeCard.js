import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import RecipeStats from "./RecipeStats";
import noImageAvailable from "../assets/noImageAvailable.jpg";

const useStyles = makeStyles({
	recipeCard: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
	},
	cardContent: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		borderBottom: "1px solid #EEE",
		flexGrow: 1
	}
});

const RecipeCard = ({ username, summary, upvoteCount, thumbImageUrl, id, name, prepTime, cookTime, servings }) => {
	const history = useHistory();
	const classes = useStyles();

	if (!thumbImageUrl) thumbImageUrl = noImageAvailable;

	const handleClick = () => history.push(`/recipes/${id}`);

	return (
		<Card className={classes.recipeCard}>
			<div style={{ overflow: "hidden", height: "50%" }}>
				<CardMedia
					component="img"
					alt={name}
					image={thumbImageUrl}
					title={name}
					onClick={() => handleClick()}
				/>
			</div>
			<CardContent className={classes.cardContent}>
				<Typography variant="h5" style={{ fontWeight: "bold" }}>{name}</Typography>
				{summary && (
					<Typography variant="body2">{summary}</Typography>
				)}
				<Typography variant="subtitle2">By <span style={{ fontSize: "1.2em" }}>{username}</span></Typography>
			</CardContent>
			<RecipeStats upvoteCount={upvoteCount} prepTime={prepTime} cookTime={cookTime} servings={servings} />
		</Card>
	);
};

RecipeCard.propTypes = {
	username: PropTypes.string,
	summary: PropTypes.string,
	upvoteCount: PropTypes.number,
	thumbImageUrl: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string.isRequired
};

export default RecipeCard;