import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import RecipeStats from "./RecipeStats";

const useStyles = makeStyles((theme) => ({
	recipeCard: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "spaceBetween",
		color: theme.palette.darkGrey.main
	}
}));

const RecipeCard = ({ username, summary, upvoteCount, thumbImageUrl, id, name, prepTime, cookTime, servings }) => {
	const history = useHistory();
	const classes = useStyles();

	const handleClick = () => history.push(`/recipes/${id}`);

	return (
		<Card className={classes.recipeCard}>
			<div style={{ overflow: "hidden" }}>
				<CardMedia
					component="img"
					alt={name}
					image={thumbImageUrl}
					title={name}
					onClick={() => handleClick()}
				/>
			</div>
			<CardContent style={{ borderBottom: "1px solid #eee" }}>
				<Typography variant="h5">{name}</Typography>
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