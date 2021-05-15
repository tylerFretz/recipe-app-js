import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";

import RecipeStats from "./RecipeStats";

const RecipeCard = ({ user, summary, upvoteCount, thumbImageUrl, id, name, prepTime, cookTime, servings }) => {
	const history = useHistory();

	const handleClick = () => history.push(`/recipes/${id}`);

	return (
		<Card style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
				<Typography variant="h6">{name}</Typography>
				<Hidden smDown>
					{summary && (
						<Typography variant="body2">{summary}</Typography>
					)}
					{user && (
						<Typography variant="subtitle2">By {user.username}</Typography>
					)}
					{!user && (
						<Typography variant="subtitle2">By Recipe App</Typography>
					)}
				</Hidden>
			</CardContent>
			<RecipeStats upvoteCount={upvoteCount} prepTime={prepTime} cookTime={cookTime} servings={servings} />
		</Card>
	);
};

RecipeCard.propTypes = {
	user: PropTypes.string,
	summary: PropTypes.string,
	upvoteCount: PropTypes.number,
	thumbImageUrl: PropTypes.string,
	name: PropTypes.string,
	id: PropTypes.string.isRequired
};

export default RecipeCard;