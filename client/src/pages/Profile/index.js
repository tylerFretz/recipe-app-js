import React from 'react';
import { Redirect, useParams, useLocation } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import LoadingIndicator from '../../components/LoadingIndicator';
import Banner from '../../components/Banner';
import CardGrid from '../../components/Cards/CardGrid';
import useUsers from '../../hooks/useUsers';
import AccountDetails from './AccountDetails';

const Profile = () => {
	const { getUserById } = useUsers();
	const { id } = useParams();
	const { state } = useLocation();
	const user = getUserById(id);

	if (user.isLoading) return <LoadingIndicator />;
	if (user.error || !state) return <Redirect to="/" />;

	const { submittedRecipes, savedRecipes, username } = user.data;

	// wait for react query to refetch populated user data
	if ((submittedRecipes[0] && typeof submittedRecipes[0] !== 'object') ||
		(savedRecipes[0] && typeof savedRecipes[0] !== 'object')) return <LoadingIndicator />;

	const breadcrumb = [{ title: 'Members', path: 'users' }];
	return (
		<>
			<Banner
				title={username}
				breadcrumbList={breadcrumb}
			/>
			{state.page === 'submitted' && (
				<>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Typography component='h2' style={{ fontSize: '2.5rem' }}>Submitted Recipes</Typography>
					</div>
					{renderRecipes(submittedRecipes, true)}
				</>
			)}
			{state.page === 'saved' && (
				<>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<Typography component='h2' style={{ fontSize: '2.5rem' }}>Saved Recipes</Typography>
					</div>
					{renderRecipes(savedRecipes, false)}
				</>
			)}
			{state.page === 'account' && (
				<AccountDetails user={user.data} />
			)}
		</>
	);
};

const renderRecipes = (recipes, isSubmitted) => {
	if (recipes.length === 0) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<h3>No Recipes here yet...</h3>
			</div>
		);
	}

	return (
		<CardGrid
			items={recipes}
			type='profile'
			isSubmitted={isSubmitted}
		/>
	);
};

export default Profile;
