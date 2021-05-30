import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";

import Banner from "../../components/Banner";
import LoadingIndicator from "../../components/LoadingIndicator";
import RecipeCardGrid from "../../components/RecipeCardGrid";
import SearchForm from "./SearchForm";
import useRecipes from "../../hooks/useRecipes";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		margin: "2% auto",
	},
	paginationContainer: {
		margin: "5% auto"
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
		return <LoadingIndicator />;
	}

	const totalPages = Math.ceil(data.length / 12);

	const handleChange = (event, value) => {
		event.preventDefault();
		window.scrollTo(0, 0);
		setPage(value);
	};

	return (
		<>
			<Banner title="Browse Recipes" breadcrumbList={[{ title: "Browse Recipes", path: "recipes/search" }]}/>
			<SearchForm />
			{totalPages === 0 && (
				<div style={{ position: "relative", margin: "10% 30%" }}>
					<Typography variant="body1" style={{ fontStyle: "italic" }}>No recipes found...</Typography>
				</div>
			)}
			{totalPages > 0 && (
				<Container className={classes.mainContainer}>
					<RecipeCardGrid recipes={data.slice((page * 12) - 12, page * 12)} />
					<div className={classes.paginationContainer}>
						<Pagination count={totalPages} page={page} onChange={handleChange} />
					</div>
				</Container>
			)}
		</>
	);
};

export default RecipeSearch;