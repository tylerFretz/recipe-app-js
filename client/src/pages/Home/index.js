import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";

//import NavigationBar from "../../components/NavigationBar";
import LoadingIndicator from "../../components/LoadingIndicator";
import JumboTronCarousel from "../../components/JumbotronCarousel";
import RecipeCardRow from "../../components/RecipeCardRow";
import SectionTitle from "./SectionTitle";

import useRecipes from "../../hooks/useRecipes";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "5%"
	},
});

const Home = () => {
	const classes = useStyles();
	const theme = useTheme();
	const isMobile= useMediaQuery(theme.breakpoints.down("sm"));
	const { queryRecipes } = useRecipes();

	const topRatedRecipes = queryRecipes({ "sortBy": "upvoteCount", "order": "desc", "limit": "3" });
	const latestRecipes = queryRecipes({ "sortBy": "dateAdded", "order": "desc", "limit": "3" });


	const renderMobile = () => (
		<>
			<JumboTronCarousel />
			<Container className={classes.root}>
				<div>
					<SectionTitle title={"Top Rated"} />
					<RecipeCardRow recipes={topRatedRecipes.data} />
				</div>
				<div>
					<SectionTitle title={"Latest"} />
					<RecipeCardRow recipes={latestRecipes.data} />
				</div>
			</Container>
		</>
	);


	if (topRatedRecipes.isLoading || latestRecipes.isLoading) {
		return <LoadingIndicator />;
	}

	return isMobile ? (
		renderMobile()
	) : (
		<>
			<JumboTronCarousel />
			<Container className={classes.root}>
				<div>
					<SectionTitle title={"Top Rated"} />
					<RecipeCardRow recipes={topRatedRecipes.data} />
				</div>
				<div>
					<SectionTitle title={"Latest"} />
					<RecipeCardRow recipes={latestRecipes.data} />
				</div>
			</Container>
		</>
	);
};

export default Home;