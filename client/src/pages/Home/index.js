import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";

import LoadingIndicator from "../../components/LoadingIndicator";
import JumboTronCarousel from "../../components/JumbotronCarousel";
import CardRow from "../../components/CardRow";
import SectionTitle from "./SectionTitle";

import useRecipes from "../../hooks/useRecipes";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: "4%",
		marginTop: "2%",
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
					<CardRow items={topRatedRecipes.data} type="recipes" />
				</div>
				<div>
					<SectionTitle title={"Latest"} />
					<CardRow items={latestRecipes.data} type="recipes" />
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
					<CardRow items={topRatedRecipes.data} type="recipes" />
				</div>
				<div>
					<SectionTitle title={"Latest"} />
					<CardRow items={latestRecipes.data} type="recipes" />
				</div>
			</Container>
		</>
	);
};

export default Home;