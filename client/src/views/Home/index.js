import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import JumboTronCarousel from "../../components/JumbotronCarousel";
import RecipeCardRow from "./RecipeCardRow";
import SectionTitle from "./SectionTitle";

import { getDefaultInitialRecipes } from "../../store/actions/recipeActions";

const useStyles = makeStyles({
	root: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
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

	const renderMobile = () => (
		<>
			<JumboTronCarousel />
			<Container className={classes.root}>
				<div>
					<SectionTitle title={"Top Rated"} />
					<RecipeCardRow queryType={"Top Rated"} />
				</div>
				<div>
					<SectionTitle title={"Latest"} />
					<RecipeCardRow queryType={"Latest"} />
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
		</>
	);
};

export default Home;

