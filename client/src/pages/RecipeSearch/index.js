import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import Banner from '../../components/Banner';
import LoadingIndicator from '../../components/LoadingIndicator';
import CardGrid from '../../components/Cards/CardGrid';
import SearchForm from './SearchForm';
import useRecipes from '../../hooks/useRecipes';

const useStyles = makeStyles({
	mainContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '2% auto',
	},
	paginationContainer: {
		margin: '5% auto',
	},
});

const getBreadcrumbList = (queryObject) => {
	let breadcrumbList = [{ title: 'Browse Recipes', path: 'recipes/search' }];
	for (const [key, value] of Object.entries(queryObject)) {
		if (key === 'category') {
			breadcrumbList = breadcrumbList.concat({
				title: value.trim(),
				path: `recipes/search?category=${value.trim()}`,
			});
		} else if (key === 'tag') {
			breadcrumbList = breadcrumbList.concat({
				title: value.trim(),
				path: `recipes/search?tag=${value.trim()}`,
			});
		} else if (key === 'area') {
			breadcrumbList = breadcrumbList.concat({
				title: value.trim(),
				path: `recipes/search?area=${value.trim()}`,
			});
		}
	}
	return breadcrumbList;
};

const RecipeSearch = () => {
	const classes = useStyles();
	const queryObject = Object.fromEntries(
		new URLSearchParams(useLocation().search).entries()
	);
	const [page, setPage] = useState(1);
	const history = useHistory();
	const { queryRecipes } = useRecipes();

	const { data, isLoading, error } = queryRecipes(queryObject);

	if (error) {
		history.push('/');
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
			<Banner
				title="Browse Recipes"
				breadcrumbList={getBreadcrumbList(queryObject)}
			/>
			<SearchForm />
			{totalPages === 0 && (
				<div style={{ position: 'relative', margin: '10% 30%' }}>
					<Typography
						variant="body1"
						style={{ fontStyle: 'italic', textAlign: 'center' }}
					>
						No recipes found...
					</Typography>
				</div>
			)}
			{totalPages > 0 && (
				<Container className={classes.mainContainer}>
					<CardGrid
						items={data.slice(page * 12 - 12, page * 12)}
						type="recipes"
					/>
					<div className={classes.paginationContainer}>
						<Pagination
							count={totalPages}
							page={page}
							onChange={handleChange}
						/>
					</div>
				</Container>
			)}
		</>
	);
};

export default RecipeSearch;
