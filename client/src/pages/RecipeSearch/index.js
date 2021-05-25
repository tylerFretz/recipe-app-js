import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";

import RecipeCardGrid from "../../components/RecipeCardGrid";
import useRecipes from "../../hooks/useRecipes";

const useStyles = makeStyles({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	}
});

const RecipeSearch = () => {
	const classes = useStyles();
	const queryObject = Object.fromEntries(new URLSearchParams(useLocation().search).entries());
	const [page, setPage] = useState(1);
	const history = useHistory();
	const { queryRecipes } = useRecipes();

	const { data, isLoading, error } = queryRecipes(queryObject);

	if (error) {
		history.push("/");
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const totalPages = Math.ceil(data.length / 12);

	const handleChange = (event, value) => {
		event.preventDefault();
		window.scrollTo(0, 0);
		setPage(value);
	};

	return (
		<Container className={classes.mainContainer}>
			<RecipeCardGrid recipes={data.slice((page * 12) - 12, page * 12)} />
			<div>
				<Pagination count={totalPages} page={page} onChange={handleChange} />
			</div>
		</Container>
	);
};

export default RecipeSearch;