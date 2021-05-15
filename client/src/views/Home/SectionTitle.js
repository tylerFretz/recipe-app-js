import React from "react";
import Proptypes from "prop-types";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	root: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "1% 0%",
		borderTop: "1px dashed #999",
		borderBottom: "1px dashed #999",
		marginTop: "7%",
		marginBottom: "2%"
	},
});

const SectionTitle = ({ title }) => {
	const history = useHistory();
	const classes = useStyles();

	const handleClick = () => {
		switch (title) {
		case "Top Rated":
			history.push("/recipes/?sort=ratings-desc");
			break;
		case "Latest":
			history.push("/recipes/?sort=date-desc");
			break;
		default:
			break;
		}
	};

	return (
		<Container className={classes.root}>
			<Typography variant="h5" style={{ margin: "5px 0" }}>
				{title} Recipes
			</Typography>
			<Button onClick={() => handleClick()} variant="contained" style={{ margin: "5px 0" }}>All {title} Recipes</Button>
		</Container>
	);
};

SectionTitle.propTypes = {
	title: Proptypes.oneOf(["Top Rated", "Latest"]).isRequired
};

export default SectionTitle;