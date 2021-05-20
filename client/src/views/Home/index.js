import React, { useEffect } from "react";
import { compareAsc } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";

import JumboTronCarousel from "../../components/JumbotronCarousel";
import RecipeCardRow from "../../components/RecipeCardRow";
import SectionTitle from "./SectionTitle";

import { getDefaultInitialRecipes } from "../../store/actions/recipeActions";

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
	const dispatch = useDispatch();
	const classes = useStyles();
	const theme = useTheme();
	const isMobile= useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		dispatch(getDefaultInitialRecipes());
	}, []);

	const topRatedRecipes = useSelector(state => state.recipes).sort((a, b) => a.upvoteCount - b.upvoteCount).slice(0, 3);
	const latestRecipes = useSelector(state => state.recipes).sort((a, b) => compareAsc(new Date(b.dateAdded), new Date(a.dateAdded))).slice(0, 3);

	const renderMobile = () => (
		<>
			<JumboTronCarousel />
			<Container className={classes.root}>
				<div>
					<SectionTitle title={"Top Rated"} />
					<RecipeCardRow recipes={topRatedRecipes} />
				</div>
				<div>
					<SectionTitle title={"Latest"} />
					<RecipeCardRow recipes={latestRecipes} />
				</div>
			</Container>
		</>
	);

	if (isMobile) {
		return renderMobile();
	}

	return (
		<>
			<JumboTronCarousel />
			<Container className={classes.root}>
				<div>
					<SectionTitle title={"Top Rated"} />
					<RecipeCardRow recipes={topRatedRecipes} />
				</div>
				<div>
					<SectionTitle title={"Latest"} />
					<RecipeCardRow recipes={latestRecipes} />
				</div>
			</Container>
		</>
	);
};

export default Home;

