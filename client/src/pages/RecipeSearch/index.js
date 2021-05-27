import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";

import NavigationBar from "../../components/NavigationBar";
import LoadingIndicator from "../../components/LoadingIndicator";
import RecipeCardGrid from "../../components/RecipeCardGrid";
import useRecipes from "../../hooks/useRecipes";

const useStyles = makeStyles({
	mainContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginTop: "2%",
		marginBottom: "4%"
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

	return (totalPages === 0) ? (
		<>
			<NavigationBar />
			<div style={{ position: "absolute", top: "50%", left: "50%" }}>No recipes found...</div>
		</>
	) : (
		<>
			<NavigationBar />
			<Container className={classes.mainContainer}>
				<RecipeCardGrid recipes={data.slice((page * 12) - 12, page * 12)} />
				<div>
					<Pagination count={totalPages} page={page} onChange={handleChange} />
				</div>
			</Container>
		</>
	);
};

export default RecipeSearch;