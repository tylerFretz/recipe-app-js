import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";

import { queryRecipes } from "../../store/actions/recipeActions";
import useRecipeSelector from "../../utils/useRecipeSelector";
import RecipeCardGrid from "../../components/RecipeCardGrid";

const useStyles = makeStyles({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}
});

const useQuery = () => {
	return new URLSearchParams(useLocation().search);
};

const RecipeSearch = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const query = useQuery();
	const queryObject = Object.fromEntries(query.entries());
	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch(queryRecipes(queryObject));
	}, []);

	const recipes = useRecipeSelector(queryObject);
	const totalPages = Math.ceil(recipes.length / 12);

	const handleChange = (event, value) => {
		window.scrollTo(0, 0);
		setPage(value);
	};


	return (
		<Container className={classes.mainContainer}>
			<RecipeCardGrid recipes={recipes.slice((page * 12) - 12, page * 12)} />
			<div>
				<Pagination count={totalPages} page={page} onChange={handleChange} size="large" />
			</div>
		</Container>
	);
};

export default RecipeSearch;