import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";

import LoadingIndicator from "../../components/LoadingIndicator";
import useRecipes from "../../hooks/useRecipes";

const useStyles = makeStyles((theme) => ({
	listContainer: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: "#FFF",
		padding: "5%",
		borderRadius: "3px",
		boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
	},
	inline: {
		display: "inline"
	},
	link: {
		textDecoration: "none",
	},
	title: {
		fontSize: "0.95rem",
		"&:hover": {
			color: theme.palette.secondary.main
		}
	},
	roundedAvatar: {
		color: "#FFF",
		backgroundColor: theme.palette.secondary.main,
		width: theme.spacing(6),
		height: theme.spacing(6)
	}
}));

const RelatedSideBar = ({ category }) => {
	const classes = useStyles();
	const { queryRecipes } = useRecipes();
	const { data, isLoading, error } = queryRecipes({ category: category ?? "dessert", limit: 3 });

	if (error) {
		return <div>Error getting related recipes...</div>;
	}

	if (isLoading) {
		return <LoadingIndicator />;
	}

	return (
		<Container className={classes.listContainer}>
			<List subheader={<Typography variant="h4">Related Recipes</Typography>}>
				{data.map(recipe => (
					<Link key={recipe.id} to={`/recipes/${recipe.id}`} className={classes.link}>
						<ListItem alignItems="flex-start">
							<ListItemAvatar>
								<Avatar
									alt={recipe.name}
									variant="rounded"
									sizes=""
									src={recipe.thumbImageUrl}
									className={classes.roundedAvatar}
								/>
							</ListItemAvatar>
							<ListItemText
								primary={<Typography variant="h6" className={classes.title}>{recipe.name}</Typography>}
								secondary={<Typography variant="body1">By {recipe.user.username}</Typography>}
							/>
						</ListItem>
						<Divider component="li" />
					</Link>
				))}
			</List>
		</Container>
	);
};

export default RelatedSideBar;