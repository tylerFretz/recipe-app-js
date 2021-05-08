import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import RecipeCardRow from "./RecipeCardRow";
import SectionTitle from "./SectionTitle";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
});

const Home = () => {
	const classes = useStyles();

	return (
		<Container className={classes.root}>
			<Grid container justify="center">
				<Grid container item xs={12} spacing={3}>
					<SectionTitle title={"Top Rated"} />
					<RecipeCardRow queryType={"Top Rated"} />
				</Grid>
				<Grid container item xs={12} spacing={3}>
					<SectionTitle title={"Latest"} />
					<RecipeCardRow queryType={"Latest"} />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;

